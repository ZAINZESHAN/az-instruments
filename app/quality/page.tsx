import type { Metadata } from "next";
import { QualityPageContent } from "@/components/quality/quality-page";

export const metadata: Metadata = {
  title: "Quality & Certificates",
  description:
    "AZ Instruments supplies surgical and dental instruments with attention to finish and consistency. Official certificates will be published when the documents are ready.",
};

export default function QualityPage() {
  return <QualityPageContent />;
}
