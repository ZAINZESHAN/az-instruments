import { sendInquiryEmail } from "@/lib/inquiry-mail";
import { validateContactInquiry, validateProductInquiry } from "@/lib/inquiries";

const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

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

export async function POST(request: Request) {
  if (limited(clientKey(request))) {
    return Response.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  if (typeof record.website === "string" && record.website.trim()) {
    return Response.json({ ok: true });
  }

  const kind = record.kind;
  const parsed =
    kind === "contact"
      ? validateContactInquiry(record)
      : kind === "product"
        ? validateProductInquiry(record)
        : null;

  if (!parsed) {
    return Response.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  if (!parsed.ok) {
    return Response.json({ ok: false, code: "invalid", errors: parsed.errors }, { status: 400 });
  }

  const sent = await sendInquiryEmail(parsed.data);
  if (!sent.ok) {
    const status = sent.code === "not_configured" ? 503 : 502;
    return Response.json({ ok: false, code: sent.code }, { status });
  }

  return Response.json({ ok: true });
}
