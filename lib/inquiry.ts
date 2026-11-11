import { site } from "@/lib/site";

export const QUOTE_FORM_HREF = "/contact#request-quote";

const QUOTE_CATEGORY_BY_ID = {
  dental: "Dental",
  orthopedic: "Orthopedic",
  orthodontic: "Orthodontic",
} as const;

export function quoteHref(product?: {
  name: string;
  catalogueCode?: string;
  categoryId?: keyof typeof QUOTE_CATEGORY_BY_ID;
}) {
  if (!product) {
    return QUOTE_FORM_HREF;
  }

  const params = new URLSearchParams({ product: product.name });
  if (product.catalogueCode) params.set("code", product.catalogueCode);
  const category = product.categoryId ? QUOTE_CATEGORY_BY_ID[product.categoryId] : undefined;
  if (category) params.set("category", category);
  return `/contact?${params.toString()}#request-quote`;
}

export function whatsappHref(message: string) {
  const base = site.whatsapp.href;
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(product: { name: string; catalogueCode?: string }) {
  const code = product.catalogueCode ? ` (${product.catalogueCode})` : "";
  return `Hello AZ Instruments, I would like a quotation for ${product.name}${code}.`;
}
