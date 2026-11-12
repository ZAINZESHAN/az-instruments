export const ENQUIRY_TYPES = [
  "Product Enquiry",
  "Bulk Order",
  "OEM / Private Label",
  "Custom Requirements",
  "General Business Enquiry",
] as const;

export const PRODUCT_CATEGORIES = [
  "Dental",
  "Orthopedic",
  "Orthodontic",
  "Multiple Categories",
] as const;

export const QUOTE_CATEGORIES = ["Dental", "Orthopedic", "Orthodontic"] as const;

export const QUOTE_FILE_MAX_BYTES = 5 * 1024 * 1024;

export const QUOTE_FILE_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".xls", ".xlsx"] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type QuoteCategory = (typeof QUOTE_CATEGORIES)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const INQUIRY_LIMITS = {
  fullName: { min: 2, max: 80 },
  company: { max: 120 },
  email: { max: 120 },
  country: { min: 2, max: 80 },
  phone: { minDigits: 7, max: 40 },
  subject: { max: 140 },
  message: { min: 10, max: 4000 },
  productName: { max: 160 },
  quantity: { max: 80 },
  instrumentList: { min: 2, max: 2000 },
  specifications: { min: 10, max: 4000 },
  targetPrice: { max: 120 },
  additionalMessage: { max: 4000 },
} as const;

export type ContactInquiry = {
  kind: "contact";
  fullName: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  message: string;
};

export type ProductInquiry = {
  kind: "product";
  fullName: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  enquiryType: EnquiryType;
  category: ProductCategory;
  productName: string;
  quantity: string;
  message: string;
};

export type QuoteInquiry = {
  kind: "quote";
  fullName: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  category: QuoteCategory;
  productName: string;
  quantity: string;
  specifications: string;
  targetPrice: string;
  message: string;
  referenceFileName: string;
};

export type InquiryPayload = ContactInquiry | ProductInquiry | QuoteInquiry;
export type FieldErrors = Record<string, string>;

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, "").trim();
}

function isEnquiryType(value: string): value is EnquiryType {
  return (ENQUIRY_TYPES as readonly string[]).includes(value);
}

function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

function isQuoteCategory(value: string): value is QuoteCategory {
  return (QUOTE_CATEGORIES as readonly string[]).includes(value);
}

export function quoteFileExtension(filename: string) {
  const base = filename.split(/[/\\]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  if (dot <= 0) return "";
  return base.slice(dot).toLowerCase();
}

export function quoteFileClientError(file: { name: string; size: number }) {
  if (!file.name.trim() || file.size <= 0) {
    return "The file is empty.";
  }
  if (file.size > QUOTE_FILE_MAX_BYTES) {
    return "The file must be 5 MB or smaller.";
  }
  if (!(QUOTE_FILE_EXTENSIONS as readonly string[]).includes(quoteFileExtension(file.name))) {
    return "Use a PDF, JPG, PNG, XLS, or XLSX file.";
  }
  return null;
}

function sharedErrors(input: Record<string, unknown>) {
  const errors: FieldErrors = {};
  const fullName = clean(input.fullName);
  const company = clean(input.company);
  const email = clean(input.email).toLowerCase();
  const country = clean(input.country);
  const phone = clean(input.phone);

  if (fullName.length < INQUIRY_LIMITS.fullName.min || fullName.length > INQUIRY_LIMITS.fullName.max) {
    errors.fullName = "Please enter your full name.";
  }

  if (company.length > INQUIRY_LIMITS.company.max) {
    errors.company = "Company name is too long.";
  }

  if (!EMAIL_PATTERN.test(email) || email.length > INQUIRY_LIMITS.email.max) {
    errors.email = "Please enter a valid business email.";
  }

  if (country.length < INQUIRY_LIMITS.country.min || country.length > INQUIRY_LIMITS.country.max) {
    errors.country = "Please enter your country.";
  }

  if (
    phone.length > INQUIRY_LIMITS.phone.max ||
    (phone && phone.replace(/\D/g, "").length < INQUIRY_LIMITS.phone.minDigits)
  ) {
    errors.phone = "Please enter a valid phone or WhatsApp number.";
  }

  return { errors, fullName, company, email, country, phone };
}

export function validateContactInquiry(
  input: Record<string, unknown>,
): { ok: true; data: ContactInquiry } | { ok: false; errors: FieldErrors } {
  const shared = sharedErrors(input);
  const errors = { ...shared.errors };
  const subject = clean(input.subject);
  const message = clean(input.message);

  if (subject.length > INQUIRY_LIMITS.subject.max) {
    errors.subject = "Subject is too long.";
  }

  if (message.length < INQUIRY_LIMITS.message.min || message.length > INQUIRY_LIMITS.message.max) {
    errors.message = "Please write a short message.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      kind: "contact",
      fullName: shared.fullName,
      company: shared.company,
      email: shared.email,
      country: shared.country,
      phone: shared.phone,
      subject,
      message,
    },
  };
}

export function validateProductInquiry(
  input: Record<string, unknown>,
): { ok: true; data: ProductInquiry } | { ok: false; errors: FieldErrors } {
  const shared = sharedErrors(input);
  const errors = { ...shared.errors };
  const enquiryType = clean(input.enquiryType);
  const category = clean(input.category);
  const productName = clean(input.productName);
  const quantity = clean(input.quantity);
  const message = clean(input.message);

  if (!isEnquiryType(enquiryType)) {
    errors.enquiryType = "Please select an enquiry type.";
  }

  if (!isProductCategory(category)) {
    errors.category = "Please select a product category.";
  }

  if (productName.length > INQUIRY_LIMITS.productName.max) {
    errors.productName = "Product name is too long.";
  }

  if (quantity.length > INQUIRY_LIMITS.quantity.max) {
    errors.quantity = "Quantity is too long.";
  }

  if (message.length < INQUIRY_LIMITS.message.min || message.length > INQUIRY_LIMITS.message.max) {
    errors.message = "Please describe the requirement.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      kind: "product",
      fullName: shared.fullName,
      company: shared.company,
      email: shared.email,
      country: shared.country,
      phone: shared.phone,
      enquiryType: enquiryType as EnquiryType,
      category: category as ProductCategory,
      productName,
      quantity,
      message,
    },
  };
}

export function validateQuoteInquiry(
  input: Record<string, unknown>,
): { ok: true; data: QuoteInquiry } | { ok: false; errors: FieldErrors } {
  const shared = sharedErrors(input);
  const errors = { ...shared.errors };
  const category = clean(input.category);
  const productName = clean(input.productName);
  const quantity = clean(input.quantity);
  const specifications = clean(input.specifications);
  const targetPrice = clean(input.targetPrice);
  const message = clean(input.message);

  if (shared.company.length < 2) {
    errors.company = "Please enter your company name.";
  }

  if (shared.phone.replace(/\D/g, "").length < INQUIRY_LIMITS.phone.minDigits) {
    errors.phone = "Please enter a WhatsApp or phone number.";
  }

  if (!isQuoteCategory(category)) {
    errors.category = "Please select a product category.";
  }

  if (
    productName.length < INQUIRY_LIMITS.instrumentList.min ||
    productName.length > INQUIRY_LIMITS.instrumentList.max
  ) {
    errors.productName = "Please list the product or instruments.";
  }

  if (!quantity || quantity.length > INQUIRY_LIMITS.quantity.max) {
    errors.quantity = "Please enter the required quantity.";
  }

  if (
    specifications.length < INQUIRY_LIMITS.specifications.min ||
    specifications.length > INQUIRY_LIMITS.specifications.max
  ) {
    errors.specifications = "Please describe the customization or specification.";
  }

  if (targetPrice.length > INQUIRY_LIMITS.targetPrice.max) {
    errors.targetPrice = "Target price is too long.";
  }

  if (message.length > INQUIRY_LIMITS.additionalMessage.max) {
    errors.message = "The message is too long.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      kind: "quote",
      fullName: shared.fullName,
      company: shared.company,
      email: shared.email,
      country: shared.country,
      phone: shared.phone,
      category: category as QuoteCategory,
      productName,
      quantity,
      specifications,
      targetPrice,
      message,
      referenceFileName: "",
    },
  };
}

export type InquiryRow = {
  label: string;
  value: string;
  long?: boolean;
};

function filled(label: string, value: string, long = false): InquiryRow[] {
  const trimmed = value.trim();
  return trimmed ? [{ label, value: trimmed, long }] : [];
}

export function inquiryContent(inquiry: InquiryPayload): { heading: string; rows: InquiryRow[] } {
  if (inquiry.kind === "contact") {
    return {
      heading: "New General Contact Submission",
      rows: [
        { label: "Full name", value: inquiry.fullName },
        ...filled("Company", inquiry.company),
        { label: "Business email", value: inquiry.email },
        { label: "Country", value: inquiry.country },
        ...filled("Phone / WhatsApp", inquiry.phone),
        ...filled("Subject", inquiry.subject),
        { label: "Message", value: inquiry.message, long: true },
      ],
    };
  }

  if (inquiry.kind === "product") {
    return {
      heading: "New Product Enquiry",
      rows: [
        { label: "Full name", value: inquiry.fullName },
        ...filled("Company", inquiry.company),
        { label: "Business email", value: inquiry.email },
        { label: "Country", value: inquiry.country },
        ...filled("Phone / WhatsApp", inquiry.phone),
        { label: "Enquiry type", value: inquiry.enquiryType },
        { label: "Product category", value: inquiry.category },
        ...filled("Product name", inquiry.productName),
        ...filled("Estimated quantity", inquiry.quantity),
        { label: "Requirements", value: inquiry.message, long: true },
      ],
    };
  }

  return {
    heading: "New Request for Quote (RFQ)",
    rows: [
      { label: "Full name", value: inquiry.fullName },
      { label: "Company", value: inquiry.company },
      { label: "Business email", value: inquiry.email },
      { label: "Country", value: inquiry.country },
      { label: "WhatsApp / Phone", value: inquiry.phone },
      { label: "Product category", value: inquiry.category },
      { label: "Product / instrument list", value: inquiry.productName, long: true },
      { label: "Required quantity", value: inquiry.quantity },
      ...filled("Target price", inquiry.targetPrice),
      ...filled("Reference file", inquiry.referenceFileName),
      { label: "Customization / specifications", value: inquiry.specifications, long: true },
      ...filled("Additional message", inquiry.message, true),
    ],
  };
}

export function inquiryText(inquiry: InquiryPayload) {
  const content = inquiryContent(inquiry);
  return [content.heading, "", ...content.rows.flatMap((row) => [row.label, row.value, ""])]
    .join("\n")
    .trim();
}
