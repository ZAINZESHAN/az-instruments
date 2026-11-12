"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/inquiry";
import { site } from "@/lib/site";
import {
  ENQUIRY_TYPES,
  PRODUCT_CATEGORIES,
  QUOTE_CATEGORIES,
  inquiryText,
  quoteFileClientError,
  validateContactInquiry,
  validateProductInquiry,
  validateQuoteInquiry,
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

function SuccessToast({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(false), 5200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return createPortal(
    <div className="pointer-events-none fixed top-20 right-4 z-[80] w-[min(24rem,calc(100%-2rem))] sm:top-[5.25rem] sm:right-6 xl:top-[5.75rem]">
      <div
        className="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-teal/25 bg-white px-4 py-3.5 text-left shadow-[0_18px_50px_-24px_rgba(23,43,77,0.55)] motion-safe:animate-[toast-in_280ms_ease-out]"
        role="status"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M5 12.5 9.2 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-navy">Sent successfully</span>
          <span className="mt-0.5 block text-sm leading-5 text-navy/75">{message}</span>
        </span>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-navy/50 transition-colors hover:bg-ice hover:text-navy"
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

function Notice({
  status,
  fallbackMessage,
  successText = "Your enquiry was sent to AZ Instruments. We will reply using the email or phone you provided.",
  attachmentPending = false,
}: {
  status: Status;
  fallbackMessage: string;
  successText?: string;
  attachmentPending?: boolean;
}) {
  const fileNote = attachmentPending ? " The reference file was not delivered." : "";

  if (status === "success") {
    return <SuccessToast message={successText} />;
  }

  if (status === "unavailable") {
    return (
      <div className="rounded-xl border border-line bg-ice px-4 py-3 text-left text-sm leading-6 text-navy" role="status">
        <p>
          This enquiry was not delivered, so it is not marked as sent.{fileNote} Email{" "}
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
      <p className="rounded-xl border border-[#b42318]/30 bg-[#b42318]/5 px-4 py-3 text-left text-sm leading-6 text-navy" role="alert">
        The enquiry could not be delivered.{fileNote} Please try again, or send it on WhatsApp.
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
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5">
      <Field label="Full name" tone="light" error={errors.fullName}>
        <input name="fullName" autoComplete="name" placeholder="Your name" className={heroFieldClass} disabled={sending} />
      </Field>
      <Field label="Business email" tone="light" error={errors.email}>
        <input name="email" type="email" autoComplete="email" placeholder="Email" className={heroFieldClass} disabled={sending} />
      </Field>
      <Field label="Country" tone="light" error={errors.country}>
        <input name="country" autoComplete="country-name" placeholder="Country" className={heroFieldClass} disabled={sending} />
      </Field>
      <Field label="Message" tone="light" error={errors.message}>
        <textarea
          name="message"
          rows={3}
          placeholder="Product information, a quotation, or a business enquiry."
          className={`${heroFieldClass} h-auto py-2.5`}
          disabled={sending}
        />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Notice status={status} fallbackMessage={fallback} />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
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
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5">
      <Field label="Full name" error={errors.fullName}>
        <input name="fullName" autoComplete="name" placeholder="Your name" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Business email" error={errors.email}>
        <input name="email" type="email" autoComplete="email" placeholder="Email" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Country" error={errors.country}>
        <input name="country" autoComplete="country-name" placeholder="Country" className={fieldClass} disabled={sending} />
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
      <Field label="Requirements" error={errors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder="Describe the instrument or specification."
          className={`${fieldClass} h-auto py-2.5`}
          disabled={sending}
        />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Notice status={status} fallbackMessage={fallback} />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send product enquiry"}
      </button>
    </form>
  );
}

const submitClass =
  "inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-not-allowed disabled:opacity-60";

export function QuoteInquiryForm() {
  const params = useSearchParams();
  const product = (params.get("product") ?? "").trim().slice(0, 500);
  const code = (params.get("code") ?? "").trim().slice(0, 80);
  const categoryParam = (params.get("category") ?? "").trim();
  const category = (QUOTE_CATEGORIES as readonly string[]).includes(categoryParam) ? categoryParam : "";
  const instrumentList = [product, code ? `(${code})` : ""].filter(Boolean).join(" ");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState("");
  const [attachmentPending, setAttachmentPending] = useState(false);
  const [sentWithFile, setSentWithFile] = useState(false);
  const sending = status === "sending";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(
      Array.from(data.entries()).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
    );
    const website = String(fields.website ?? "");
    const parsed = validateQuoteInquiry(fields);
    const nextErrors = parsed.ok ? {} : { ...parsed.errors };
    const file = data.get("referenceFile");
    const uploaded = file instanceof File && (file.size > 0 || file.name.trim().length > 0);
    if (uploaded) {
      const fileError = quoteFileClientError(file);
      if (fileError) nextErrors.referenceFile = fileError;
    }

    if (!parsed.ok || nextErrors.referenceFile) {
      setErrors(nextErrors);
      setStatus("idle");
      setAttachmentPending(false);
      return;
    }

    setErrors({});
    setStatus("sending");
    setAttachmentPending(uploaded);
    setFallback(
      inquiryText({
        ...parsed.data,
        referenceFileName: file instanceof File && uploaded ? file.name : "",
      }),
    );

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        body: data,
      });
      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; errors?: FieldErrors }
        | null;
      if (website.trim()) {
        setStatus("idle");
        return;
      }
      if (response.ok && body?.ok) {
        form.reset();
        setSentWithFile(uploaded);
        setAttachmentPending(false);
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
    <form key={`${instrumentList}|${category}`} onSubmit={onSubmit} noValidate className="grid gap-3.5">
      <input type="hidden" name="kind" value="quote" />
      <Field label="Full name" error={errors.fullName}>
        <input name="fullName" autoComplete="name" placeholder="Your name" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Company name" error={errors.company}>
        <input name="company" autoComplete="organization" placeholder="Company name" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Business email" error={errors.email}>
        <input name="email" type="email" autoComplete="email" placeholder="Email" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Country" error={errors.country}>
        <input name="country" autoComplete="country-name" placeholder="Country" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="WhatsApp / Phone" error={errors.phone}>
        <input name="phone" autoComplete="tel" placeholder="Include the country code" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Product category" error={errors.category}>
        <select name="category" defaultValue={category} className={fieldClass} disabled={sending}>
          <option value="" disabled>
            Select a category
          </option>
          {QUOTE_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Product name / instrument list" error={errors.productName}>
        <textarea
          name="productName"
          rows={3}
          defaultValue={instrumentList}
          placeholder="Instrument names, or one name per line."
          className={`${fieldClass} h-auto py-2.5`}
          disabled={sending}
        />
      </Field>
      <Field label="Required quantity" error={errors.quantity}>
        <input name="quantity" placeholder="For example, 500" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Customization / specifications" error={errors.specifications}>
        <textarea
          name="specifications"
          rows={4}
          placeholder="Finish, size, or other requirements."
          className={`${fieldClass} h-auto py-2.5`}
          disabled={sending}
        />
      </Field>
      <Field label="Target price" optional error={errors.targetPrice}>
        <input name="targetPrice" placeholder="In your currency, if you have a target" className={fieldClass} disabled={sending} />
      </Field>
      <Field label="Reference file" optional error={errors.referenceFile}>
        <input
          name="referenceFile"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx,application/pdf,image/jpeg,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="block w-full text-left text-[12px] font-normal text-navy file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-ice file:px-3 file:text-[12px] file:font-semibold file:text-navy sm:text-sm"
          disabled={sending}
        />
        <span className="text-[11px] leading-4 font-normal text-muted sm:text-xs">
          PDF, JPG, PNG, XLS, or XLSX. Maximum 5 MB. A selected file is sent with the request.
        </span>
      </Field>
      <Field label="Additional message" optional error={errors.message}>
        <textarea
          name="message"
          rows={3}
          placeholder="Anything else the quotation should cover."
          className={`${fieldClass} h-auto py-2.5`}
          disabled={sending}
        />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Notice
        status={status}
        fallbackMessage={fallback}
        attachmentPending={attachmentPending && status !== "success"}
        successText={
          sentWithFile
            ? "Your quotation request was sent to AZ Instruments, including the reference file. We will reply using the email or phone you provided."
            : "Your quotation request was sent to AZ Instruments. We will reply using the email or phone you provided."
        }
      />
      <button type="submit" disabled={sending} className={submitClass}>
        {sending ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
