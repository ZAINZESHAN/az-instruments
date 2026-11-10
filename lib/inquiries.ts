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

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

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

export type InquiryPayload = ContactInquiry | ProductInquiry;
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

export function inquiryText(inquiry: InquiryPayload) {
  if (inquiry.kind === "contact") {
    return [
      "New website contact enquiry",
      "",
      `Name: ${inquiry.fullName}`,
      `Company: ${inquiry.company || "Not provided"}`,
      `Email: ${inquiry.email}`,
      `Country: ${inquiry.country}`,
      `Phone / WhatsApp: ${inquiry.phone || "Not provided"}`,
      `Subject: ${inquiry.subject || "Not provided"}`,
      "",
      "Message:",
      inquiry.message,
    ].join("\n");
  }

  return [
    "New product enquiry",
    "",
    `Name: ${inquiry.fullName}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Email: ${inquiry.email}`,
    `Country: ${inquiry.country}`,
    `Phone / WhatsApp: ${inquiry.phone || "Not provided"}`,
    `Enquiry type: ${inquiry.enquiryType}`,
    `Product category: ${inquiry.category}`,
    `Product name: ${inquiry.productName || "Not provided"}`,
    `Estimated quantity: ${inquiry.quantity || "Not provided"}`,
    "",
    "Requirements:",
    inquiry.message,
  ].join("\n");
}
