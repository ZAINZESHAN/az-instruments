import { sendInquiryEmail } from "@/lib/inquiry-mail";
import {
  QUOTE_FILE_MAX_BYTES,
  validateContactInquiry,
  validateProductInquiry,
  validateQuoteInquiry,
  type FieldErrors,
  type QuoteInquiry,
} from "@/lib/inquiries";
import { inspectQuoteFile } from "@/lib/quote-file";

const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = QUOTE_FILE_MAX_BYTES + 512 * 1024;

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function limited(key: string) {
  const now = Date.now();
  const stamps = (recent.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (stamps.length >= MAX_REQUESTS) {
    recent.set(key, stamps);
    return true;
  }
  stamps.push(now);
  recent.set(key, stamps);
  return false;
}

function invalid(errors?: FieldErrors, status = 400) {
  return Response.json(errors ? { ok: false, code: "invalid", errors } : { ok: false, code: "invalid" }, {
    status,
  });
}

async function deliver(data: Parameters<typeof sendInquiryEmail>[0], attachment?: Parameters<typeof sendInquiryEmail>[1]) {
  const sent = await sendInquiryEmail(data, attachment);
  if (!sent.ok) {
    const status = sent.code === "not_configured" ? 503 : 502;
    return Response.json({ ok: false, code: sent.code }, { status });
  }
  return Response.json({ ok: true });
}

function uploadedFiles(form: FormData) {
  return form.getAll("referenceFile").filter((entry): entry is File => {
    return entry instanceof File && (entry.size > 0 || entry.name.trim().length > 0);
  });
}

async function quoteFromMultipart(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return invalid({ referenceFile: "The file must be 5 MB or smaller." });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return invalid();
  }

  const record: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") record[key] = value;
  }

  if (record.kind !== "quote") {
    return invalid();
  }

  if (typeof record.website === "string" && record.website.trim()) {
    return Response.json({ ok: true });
  }

  const parsed = validateQuoteInquiry(record);
  const errors: FieldErrors = parsed.ok ? {} : { ...parsed.errors };
  const files = uploadedFiles(form);
  let attachment: { filename: string; contentType: string; contentBase64: string } | undefined;

  if (files.length > 1) {
    errors.referenceFile = "Attach one reference file only.";
  } else if (files.length === 1) {
    const file = files[0];
    if (file.size > QUOTE_FILE_MAX_BYTES) {
      errors.referenceFile = "The file must be 5 MB or smaller.";
    } else {
      const inspected = inspectQuoteFile(file, new Uint8Array(await file.arrayBuffer()));
      if (!inspected.ok) {
        errors.referenceFile = inspected.error;
      } else {
        attachment = {
          filename: inspected.file.filename,
          contentType: inspected.file.contentType,
          contentBase64: Buffer.from(inspected.file.bytes).toString("base64"),
        };
      }
    }
  }

  if (!parsed.ok || Object.keys(errors).length > 0) {
    return invalid(errors);
  }

  const data: QuoteInquiry = {
    ...parsed.data,
    referenceFileName: attachment?.filename ?? "",
  };
  return deliver(data, attachment);
}

export async function POST(request: Request) {
  if (limited(clientKey(request))) {
    return Response.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    return quoteFromMultipart(request);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid();
  }

  if (!body || typeof body !== "object") {
    return invalid();
  }

  const record = body as Record<string, unknown>;
  if (typeof record.website === "string" && record.website.trim()) {
    return Response.json({ ok: true });
  }

  if (record.kind === "quote" && typeof record.referenceFile === "string" && record.referenceFile.trim()) {
    return invalid({
      referenceFile: "Attach the reference file with the quotation form.",
    });
  }

  const kind = record.kind;
  const parsed =
    kind === "contact"
      ? validateContactInquiry(record)
      : kind === "product"
        ? validateProductInquiry(record)
        : kind === "quote"
          ? validateQuoteInquiry(record)
          : null;

  if (!parsed) {
    return invalid();
  }

  if (!parsed.ok) {
    return invalid(parsed.errors);
  }

  return deliver(parsed.data);
}
