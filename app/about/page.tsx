import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.description} A.Z. Instruments Company is a member of the Sialkot Chamber of Commerce & Industry.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
