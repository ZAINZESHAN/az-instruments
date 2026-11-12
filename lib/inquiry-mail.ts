import { inquiryText, type InquiryPayload } from "@/lib/inquiries";
import { site } from "@/lib/site";

export type MailAttachment = {
  filename: string;
  contentType: string;
  contentBase64: string;
};

function envValue(name: string) {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1).trim();
  }
  return raw;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SUBJECTS = {
  contact: "New General Contact Submission",
  product: "New Product Enquiry",
  quote: "New Request for Quote (RFQ)",
} as const;

function senderAddress(email: string) {
  if (email.includes("<")) return email;
  return `${site.name} <${email}>`;
}

/**
 * Sends only when Resend is configured.
 * Required server env: RESEND_API_KEY, FROM_EMAIL, and CONTACT_EMAIL.
 * Every form is delivered to CONTACT_EMAIL. A quote file is attached to that
 * same email and is never dropped on a successful send.
 */
export async function sendInquiryEmail(
  inquiry: InquiryPayload,
  attachment?: MailAttachment,
): Promise<{ ok: true } | { ok: false; code: "not_configured" | "delivery_failed" }> {
  const expectsFile = inquiry.kind === "quote" && inquiry.referenceFileName.length > 0;
  if (expectsFile && (!attachment || attachment.filename !== inquiry.referenceFileName)) {
    return { ok: false, code: "delivery_failed" };
  }

  const apiKey = envValue("RESEND_API_KEY");
  const fromEmail = envValue("FROM_EMAIL");
  const toEmail = envValue("CONTACT_EMAIL");

  if (!apiKey || !fromEmail?.includes("@") || !toEmail?.includes("@")) {
    return { ok: false, code: "not_configured" };
  }

  const text = inquiryText(inquiry);
  const subject = SUBJECTS[inquiry.kind];

  const payload: Record<string, unknown> = {
    from: senderAddress(fromEmail),
    to: [toEmail],
    reply_to: inquiry.email,
    subject,
    text,
    html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#172B4D">${escapeHtml(text).replace(/\n/g, "<br>")}</div>`,
  };

  if (attachment) {
    payload.attachments = [
      {
        filename: attachment.filename,
        content: attachment.contentBase64,
        content_type: attachment.contentType,
      },
    ];
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = (await response.json().catch(() => null)) as { id?: string; message?: string; name?: string } | null;
    if (!response.ok || !body?.id) {
      console.error("Resend delivery failed", response.status, body?.name || body?.message || "");
      return { ok: false, code: "delivery_failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, code: "delivery_failed" };
  }
}
