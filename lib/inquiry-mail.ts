import { inquiryText, type InquiryPayload } from "@/lib/inquiries";

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

/**
 * Sends only when Resend is configured.
 * Required: RESEND_API_KEY and CONTACT_FROM_EMAIL.
 * Recipient defaults to the company inbox. CONTACT_RECEIVER_EMAIL can override it.
 */
export async function sendInquiryEmail(
  inquiry: InquiryPayload,
): Promise<{ ok: true } | { ok: false; code: "not_configured" | "delivery_failed" }> {
  const apiKey = envValue("RESEND_API_KEY");
  const fromEmail = envValue("CONTACT_FROM_EMAIL");
  const toEmail = envValue("CONTACT_RECEIVER_EMAIL") || "azinstruments.official@gmail.com";

  if (!apiKey || !fromEmail?.includes("@") || !toEmail?.includes("@")) {
    return { ok: false, code: "not_configured" };
  }

  const text = inquiryText(inquiry);
  const subject =
    inquiry.kind === "contact"
      ? `Contact enquiry — ${inquiry.fullName}`
      : `Product enquiry — ${inquiry.fullName}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: inquiry.email,
        subject,
        text,
        html: `<pre>${escapeHtml(text)}</pre>`,
      }),
    });

    if (!response.ok) {
      return { ok: false, code: "delivery_failed" };
    }

    const body = (await response.json().catch(() => null)) as { id?: string } | null;
    if (!body?.id) {
      return { ok: false, code: "delivery_failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, code: "delivery_failed" };
  }
}
