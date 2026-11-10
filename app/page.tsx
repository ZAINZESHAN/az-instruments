import { CategoryPreview } from "@/components/home/category-preview";
import { ComplianceStrip } from "@/components/home/compliance-strip";
import { EnquiryCta } from "@/components/home/enquiry-cta";
import { FeaturedInstruments } from "@/components/home/featured-instruments";
import { Hero } from "@/components/home/hero";
import { QualityPreview } from "@/components/home/quality-preview";
import { Trust } from "@/components/home/trust";
import { WhyAz } from "@/components/home/why-az";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <FeaturedInstruments />
      <WhyAz />
      <CategoryPreview />
      <QualityPreview />
      <ComplianceStrip />
      <EnquiryCta />
    </>
  );
}
