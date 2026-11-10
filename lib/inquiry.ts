import { site } from "@/lib/site";

export function quoteHref(product?: { name: string; catalogueCode?: string }) {
  if (!product) {
    return "/contact";
  }

  const params = new URLSearchParams({ product: product.name });
  if (product.catalogueCode) {
    params.set("code", product.catalogueCode);
  }
  return `/contact?${params.toString()}#product-enquiry`;
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
