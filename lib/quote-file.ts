import {
  QUOTE_FILE_MAX_BYTES,
  quoteFileClientError,
  quoteFileExtension,
} from "@/lib/inquiries";

const MIME_BY_EXTENSION: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export type QuoteAttachment = {
  filename: string;
  contentType: string;
  bytes: Uint8Array;
};

function startsWith(bytes: Uint8Array, signature: number[]) {
  if (bytes.length < signature.length) return false;
  return signature.every((value, index) => bytes[index] === value);
}

function includesAscii(bytes: Uint8Array, needle: string) {
  const pattern = Array.from(needle, (char) => char.charCodeAt(0));
  if (pattern.length === 0 || bytes.length < pattern.length) return false;
  const last = bytes.length - pattern.length;
  for (let index = 0; index <= last; index += 1) {
    let matched = true;
    for (let offset = 0; offset < pattern.length; offset += 1) {
      if (bytes[index + offset] !== pattern[offset]) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

function matchesType(extension: string, bytes: Uint8Array) {
  if (extension === ".pdf") return startsWith(bytes, [0x25, 0x50, 0x44, 0x46]);
  if (extension === ".jpg" || extension === ".jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (extension === ".png") return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (extension === ".xls") return startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0]);
  if (extension === ".xlsx") {
    return startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) && includesAscii(bytes, "xl/workbook.xml");
  }
  return false;
}

function safeFilename(original: string, extension: string) {
  const base = (original.split(/[/\\]/).pop() ?? "reference").replace(/\.[^.]+$/, "");
  const cleaned = base
    .replace(/[^\w.-]+/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 60);
  return `${cleaned || "reference"}${extension}`;
}

export function inspectQuoteFile(
  file: { name: string; size: number },
  bytes: Uint8Array,
): { ok: true; file: QuoteAttachment } | { ok: false; error: string } {
  const clientError = quoteFileClientError(file);
  if (clientError) return { ok: false, error: clientError };
  if (bytes.byteLength !== file.size || bytes.byteLength > QUOTE_FILE_MAX_BYTES) {
    return { ok: false, error: "The file must be 5 MB or smaller." };
  }

  const extension = quoteFileExtension(file.name);
  if (!matchesType(extension, bytes)) {
    return { ok: false, error: "Use a PDF, JPG, PNG, XLS, or XLSX file." };
  }

  return {
    ok: true,
    file: {
      filename: safeFilename(file.name, extension),
      contentType: MIME_BY_EXTENSION[extension],
      bytes,
    },
  };
}
