import type { Metadata } from "next";
import { OemPageContent } from "@/components/oem/oem-page";

export const metadata: Metadata = {
  title: "OEM & Private Label",
  description:
    "AZ Instruments welcomes OEM enquiries for dental, orthopedic, and orthodontic instruments made to a drawing, sample, or specification.",
};

export default function OemPage() {
  return <OemPageContent />;
}
