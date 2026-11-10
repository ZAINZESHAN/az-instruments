import type { Metadata } from "next";
import { ManufacturingPageContent } from "@/components/manufacturing/manufacturing-page";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "AZ Instruments in Sialkot supplies dental, orthopedic, and orthodontic instruments, with attention to pattern detail and buyer requirements.",
};

export default function ManufacturingPage() {
  return <ManufacturingPageContent />;
}
