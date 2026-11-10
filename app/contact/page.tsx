import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AZ Instruments in Sialkot for product information, quotations, and business enquiries. WhatsApp +92 3092140037.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
