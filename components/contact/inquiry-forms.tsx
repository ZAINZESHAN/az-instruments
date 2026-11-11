"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/inquiry";
import { site } from "@/lib/site";
import {
  ENQUIRY_TYPES,
  PRODUCT_CATEGORIES,
  inquiryText,
  validateContactInquiry,
  validateProductInquiry,
  type FieldErrors,
  type InquiryPayload,
} from "@/lib/inquiries";

type Status = "idle" | "sending" | "success" | "error" | "unavailable";

const fieldClass =
  "h-9 w-full rounded-lg border border-line bg-white px-2 text-[12px] font-normal text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-blue disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:px-3 sm:text-sm";

const heroFieldClass =
  "h-9 w-full rounded-xl border border-transparent bg-white px-2 text-[12px] font-normal text-navy shadow-sm outline-none transition-colors placeholder:text-navy/40 focus:ring-2 focus:ring-white/70 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:px-3.5 sm:text-sm [&:-webkit-autofill]:[-webkit-text-fill-color:#172B4D] [&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#ffffff]";

function Field({
  label,
  error,
  children,
  optional,
  tone = "default",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  optional?: boolean;
  tone?: "default" | "light";
}) {
  return (
    <label className={`grid justify-items-start gap-1 text-left text-[11px] leading-4 font-semibold sm:gap-2 sm:text-sm sm:leading-5 ${tone === "light" ? "text-white" : "text-navy"}`}>
      <span>
        {label}
        {optional ? (
          <span className={`ml-1 font-normal ${tone === "light" ? "text-white/55" : "text-muted"}`}>
            Optional
          </span>
        ) : null}
      </span>
      {children}
      {error ? <span className="text-sm font-normal text-[#b42318]">{error}</span> : null}
    </label>
  );
}

function Notice({
  status,
  fallbackMessage,
}: {
  status: Status;
  fallbackMessage: string;
}) {
  if (status === "success") {
    return (
      <p className="rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm leading-6 text-navy" role="status">
        Your enquiry was sent to AZ Instruments. We will reply using the email or phone you provided.
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="rounded-xl border border-line bg-ice px-4 py-3 text-sm leading-6 text-navy" role="status">
        <p>
          This enquiry was not delivered, so it is not marked as sent. Email{" "}
          <a className="font-semibold text-blue" href={site.email.href}>
            {site.email.display}
          </a>{" "}
          or send it on WhatsApp.
        </p>
        <div className="mt-3">
          <ButtonLink href={whatsappHref(fallbackMessage)} variant="whatsapp">
            <WhatsAppIcon className="h-4 w-4" />
            Send the same enquiry on WhatsApp
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="rounded-xl border border-[#b42318]/30 bg-[#b42318]/5 px-4 py-3 text-sm leading-6 text-navy" role="alert">
        The enquiry could not be delivered. Please try again, or send it on WhatsApp.
      </p>
    );
  }

  return null;
}

async function submitInquiry(payload: InquiryPayload, website: string) {
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, website }),
  });
  const body = (await response.json().catch(() => null)) as
    | { ok?: boolean; code?: string; errors?: FieldErrors }
    | null;
  return { response, body };
}

export function ContactInquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState("");
  const sending = status === "sending";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const website = String(data.website ?? "");
    const parsed = validateContactInquiry(data);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("sending");
    setFallback(inquiryText(parsed.data));

    try {
      const { response, body } = await submitInquiry(parsed.data, website);
      if (response.ok && body?.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        return;
      }
      setStatus(body?.code === "not_configured" ? "unavailable" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Field label="Full name" tone="light" error={errors.fullName}>
          <input name="fullName" autoComplete="name" placeholder="Your name" className={heroFieldClass} disabled={sending} />
        </Field>
        <Field label="Company name" tone="light" optional error={errors.company}>
          <input name="company" autoComplete="organization" placeholder="Company name" className={heroFieldClass} disabled={sending} />
        </Field>
        <Field label="Business email" tone="light" error={errors.email}>
          <input name="email" type="email" autoComplete="email" placeholder="Email" className={heroFieldClass} disabled={sending} />
        </Field>
        <Field label="Country" tone="light" error={errors.country}>
          <input name="country" autoComplete="country-name" placeholder="Country" className={heroFieldClass} disabled={sending} />
        </Field>
        <Field label="Phone / WhatsApp" tone="light" optional error={errors.phone}>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+92 …" className={heroFieldClass} disabled={sending} />
        </Field>
        <Field label="Subject" tone="light" optional error={errors.subject}>
          <input name="subject" placeholder="What is this about?" className={heroFieldClass} disabled={sending} />
        </Field>
      </div>
      <Field label="Message" tone="light" error={errors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder="Product information, a quotation, or a business enquiry."
          className={`${heroFieldClass} h-auto py-3`}
          disabled={sending}
        />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Notice status={status} fallbackMessage={fallback} />
      <div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

export function ProductInquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState("");
  const sending = status === "sending";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const website = String(data.website ?? "");
    const parsed = validateProductInquiry(data);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("sending");
    setFallback(inquiryText(parsed.data));

    try {
      const { response, body } = await submitInquiry(parsed.data, website);
      if (response.ok && body?.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        return;
      }
      setStatus(body?.code === "not_configured" ? "unavailable" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Field label="Full name" error={errors.fullName}>
          <input name="fullName" autoComplete="name" placeholder="Your name" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Company name" optional error={errors.company}>
          <input name="company" autoComplete="organization" placeholder="Company name" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Business email" error={errors.email}>
          <input name="email" type="email" autoComplete="email" placeholder="Email" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Country" error={errors.country}>
          <input name="country" autoComplete="country-name" placeholder="Country" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Phone / WhatsApp" optional error={errors.phone}>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+92 …" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Enquiry type" error={errors.enquiryType}>
          <select name="enquiryType" defaultValue="" className={fieldClass} disabled={sending}>
            <option value="" disabled>
              Select an enquiry type
            </option>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Product category" error={errors.category}>
          <select name="category" defaultValue="" className={fieldClass} disabled={sending}>
            <option value="" disabled>
              Select a category
            </option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Product name" optional error={errors.productName}>
          <input name="productName" placeholder="Pattern name, if you have one" className={fieldClass} disabled={sending} />
        </Field>
        <Field label="Estimated quantity" optional error={errors.quantity}>
          <input name="quantity" placeholder="For example, 500" className={fieldClass} disabled={sending} />
        </Field>
      </div>
      <Field label="Requirements / specifications" error={errors.message}>
        <textarea
          name="message"
          rows={5}
          placeholder="Describe the instrument, finish, or specification."
          className={`${fieldClass} h-auto py-3`}
          disabled={sending}
        />
      </Field>
      <p className="text-sm leading-6 text-muted">
        Drawings and reference files are not accepted on this form. There is no file store connected.
        You can send a drawing on WhatsApp with the same enquiry.
      </p>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Notice status={status} fallbackMessage={fallback} />
      <div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send product enquiry"}
        </button>
      </div>
    </form>
  );
}
