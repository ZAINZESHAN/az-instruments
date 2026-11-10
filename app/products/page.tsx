import type { Metadata } from "next";
import { ProductsExperience } from "@/components/products/products-experience";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Surgical, dental, and orthodontic instruments from AZ Instruments in Sialkot. Review patterns and request a quotation.",
};

export default function ProductsPage() {
  return <ProductsExperience />;
}
