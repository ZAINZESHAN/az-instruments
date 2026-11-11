import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { HandshakeIcon, InspectIcon, PenIcon, WhatsAppIcon } from "@/components/ui/icons";
import { catalogueCategories, categoryIllustrations } from "@/lib/catalogue";
import { QUOTE_FORM_HREF, whatsappHref } from "@/lib/inquiry";
import { site } from "@/lib/site";

const banner = {
  src: "/brand/oem-hero.png",
  alt: "Close view of surgical instrument handles with marking on the metal",
  width: 985,
  height: 557,
} as const;

/**
 * Supported by the published custom-design note: drawing, sample, or specification.
 * Do not add engraving, packaging, or branding as a confirmed service until the company verifies it.
 */
const oemPoints = [
  {
    title: "Custom instrument requirements",
    text: "A buyer can ask for an instrument that follows their own requirement rather than only a catalogue pattern.",
  },
  {
    title: "Drawings and specifications",
    text: "A drawing or a written specification can be the reference for what is being discussed.",
  },
  {
    title: "Sample-based requirements",
    text: "A physical sample can be sent so the pattern can be discussed against something the buyer already uses.",
  },
  {
    title: "Customization discussions",
    text: "Changes to a pattern are discussed before a quotation. They are not treated as already agreed.",
  },
  {
    title: "B2B partnerships",
    text: "The enquiry is for distributors and professional buyers who want a continuing supply conversation.",
  },
] as const;

/**
 * Discussion topics only. Logo marking, engraving, and custom packaging are not confirmed offerings.
 */
const privateLabelTopics = [
  {
    title: "Buyer branding requirements",
    text: "Tell us how the instrument should be identified for your brand. This is recorded as a request, not as a service already offered.",
  },
  {
    title: "Logo and marking preferences",
    text: "A logo, code, or other mark can be described in the enquiry. Marking on the instrument is not confirmed until AZ Instruments accepts that request.",
  },
  {
    title: "Packaging preferences",
    text: "Pack format, labelling, and inner packing can be noted. Custom packaging is not listed as an available service yet.",
  },
  {
    title: "Product presentation",
    text: "How the instrument is shown to your customer — name, finish notes, and packing — can be part of the same discussion.",
  },
] as const;

const steps = [
  { index: "01", title: "Share Your Requirements", text: "Send the instrument, quantity, and what should differ from a catalogue pattern." },
  { index: "02", title: "Discuss Product Specifications", text: "We go through the notes so both sides are talking about the same instrument." },
  { index: "03", title: "Review Samples or Drawings", text: "A drawing, sample, or specification is the reference for that review." },
  { index: "04", title: "Confirm Quotation", text: "A quotation follows once the requirement is clear enough to price." },
  { index: "05", title: "Approve Final Requirements", text: "Work proceeds from the requirement you approve, not from an assumption." },
  { index: "06", title: "Production & Supply", text: "Supply follows that approval. This sequence is a way of working together, not a promised timetable." },
] as const;

const reasons = [
  {
    title: "Based in Sialkot",
    text: `${site.company.locationLabel} is the published location for AZ Instruments.`,
  },
  {
    title: "Industry experience",
    text: `The company states approximately ${site.company.experienceYears} years of industry experience. A founding year is not published.`,
  },
  {
    title: "Buyer requirements",
    text: "Custom work starts from the drawing, sample, or specification the buyer provides.",
  },
  {
    title: "Clear communication",
    text: "Questions about a pattern or a custom request are answered against the notes you send.",
  },
  {
    title: "Long-term supply",
    text: "The aim is a repeat relationship with distributors and importers, not a one-off description.",
  },
] as const;

export function OemPageContent() {
  return (
    <div className="bg-white">
      <section className="overflow-hidden bg-[#042848]">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              OEM &amp; Private Label
            </p>
            <h1 className="mt-4 type-display text-white">
              OEM &amp; Private Label Solutions
            </h1>
            <p className="mt-5 type-lead text-white/85">
              AZ Instruments welcomes business enquiries for customized surgical, dental,
              orthopedic, and orthodontic instruments. A requirement can start from a catalogue
              pattern or from your drawing, sample, or specification.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={QUOTE_FORM_HREF} className="h-12 px-6">
                Request an OEM Quote
              </ButtonLink>
              <ButtonLink href="/products" variant="outline" className="h-12 bg-white px-6">
                Explore Products
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#083a6c] shadow-[0_24px_60px_-36px_rgba(0,0,0,0.65)]">
            <Image
              src={banner.src}
              alt={banner.alt}
              width={banner.width}
              height={banner.height}
              priority
              quality={100}
              unoptimized
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              OEM
            </p>
            <h2 className="mt-3 type-section text-navy">
              OEM Manufacturing
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              {site.customDesign} International buyers and distributors can open that conversation
              for a surgical, dental, orthopedic, or orthodontic instrument.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oemPoints.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-ice/40 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:bg-white hover:shadow-[0_16px_40px_-28px_rgba(23,105,255,0.35)]"
              >
                <PenIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 type-sub text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Private label
            </p>
            <h2 className="mt-3 type-section text-navy">
              Private Label Opportunities
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              Branding, marking, and packaging can be raised in an enquiry. They are listed here
              as topics to discuss. They are not confirmed services, and nothing below is a
              promise of engraving, a logo, or custom packing.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {privateLabelTopics.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="type-sub text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              How an enquiry moves
            </p>
            <h2 className="mt-3 type-section text-navy">
              Customization Process
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              This is a proposed way for a buyer and AZ Instruments to work through a custom
              requirement. It is not a production schedule and it does not set a delivery date.
            </p>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.index} className="rounded-2xl border border-line bg-white p-6">
                <span className="text-sm font-semibold tracking-[0.16em] text-blue">{step.index}</span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
                Catalogue
              </p>
              <h2 className="mt-3 type-section text-navy">
                Product Categories
              </h2>
              <p className="mt-4 text-base leading-7 text-navy/75">
                Photographs are from the current catalogue. A custom enquiry can refer to one of
                these groups, or to a drawing of your own.
              </p>
            </div>
            <ButtonLink href="/products" variant="outline" className="shrink-0 bg-white">
              Explore Products
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-7">
            {catalogueCategories.map((category) => {
              const illustration = categoryIllustrations[category.id];
              return (
                <li key={category.id}>
                  <Link
                    href="/products#product-collection"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_36px_-26px_rgba(23,43,77,0.5)] transition duration-200 hover:-translate-y-0.5 hover:border-blue/45 hover:shadow-[0_20px_44px_-26px_rgba(23,105,255,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    <div className="relative aspect-[5/4] bg-ice/70">
                      <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-contain p-10 transition duration-200 group-hover:scale-[1.03] sm:p-12"
                      />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-line px-6 pt-5 pb-6">
                      <h3 className="type-sub text-navy">{category.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted">{category.summary}</p>
                      <span className="mt-5 text-sm font-semibold text-blue">View products →</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-[#042848]">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
              Partnership
            </p>
            <h2 className="mt-3 type-section text-white">
              Why Partner With AZ Instruments
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <li key={reason.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <HandshakeIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 type-sub text-white">{reason.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{reason.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#042848] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <InspectIcon className="h-8 w-8 text-blue" />
                <h2 className="mt-4 type-section text-white">
                  Have a Custom Instrument Requirement?
                </h2>
                <p className="mt-4 text-base leading-7 text-white/75">
                  Distributors, importers, and other international buyers can discuss an OEM or
                  private-label requirement with AZ Instruments. Send the instrument details, and
                  any drawing, sample, or specification you want used.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                  Contact Us
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref(
                    "Hello AZ Instruments, I would like to discuss an OEM or private label requirement.",
                  )}
                  variant="whatsapp"
                  className="h-12 px-6"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp {site.whatsapp.display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
