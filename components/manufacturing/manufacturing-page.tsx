import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import {
  GearIcon,
  HandshakeIcon,
  InspectIcon,
  ShieldIcon,
  SupportIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { catalogueCategories, categoryIllustrations } from "@/lib/catalogue";
import { whatsappHref } from "@/lib/inquiry";
import { site } from "@/lib/site";

const banner = {
  src: "/brand/manufacturing-hero.png",
  alt: "A technician checking a surgical instrument at a bench laid out with rows of instruments",
  width: 1024,
  height: 558,
} as const;

/**
 * General areas buyers ask about. Not a confirmed list of in-house processes.
 * Replace the notes when AZ Instruments confirms what is done, and where.
 */
const capabilities = [
  {
    title: "Instrument Shaping",
    text: "Forming the working end and handles of a pattern so the instrument matches the shape being offered.",
  },
  {
    title: "Surface Finishing",
    text: "Work on the surface of the instrument so the finish is even before it is shown to a buyer.",
  },
  {
    title: "Polishing",
    text: "A finishing step concerned with how the metal looks and feels once the pattern is complete.",
  },
  {
    title: "Assembly",
    text: "Bringing joints, screws, and handles together on patterns that are made from more than one part.",
  },
  {
    title: "Product Inspection",
    text: "A look at the finished instrument against the pattern and any note agreed for the order.",
  },
  {
    title: "Packaging & Preparation",
    text: "Preparing the instrument so it can be presented and sent against the buyer's order.",
  },
] as const;

const details = [
  {
    title: "Finishing and appearance",
    text: "The instrument should look complete: even surfaces, aligned parts, and a finish that matches the pattern in the catalogue.",
  },
  {
    title: "Product details",
    text: "Jaws, tips, joints, and handles are the details a buyer compares with the photograph and the product name.",
  },
  {
    title: "Consistency",
    text: "A later order should follow the same pattern name and the same agreed notes as the first.",
  },
  {
    title: "Buyer requirements",
    text: "A drawing, sample, or written specification is the reference when the buyer asks for something other than a catalogue pattern.",
  },
] as const;

const commitments = [
  {
    title: "Requirements first",
    text: "The conversation starts from the instrument the buyer names, the quantity, and any specification they send.",
  },
  {
    title: "Clear presentation",
    text: "Each catalogue pattern is shown under its own name and photograph, so the buyer can point to a specific instrument.",
  },
  {
    title: "Consistent supply",
    text: "Repeat enquiries refer back to the same pattern, rather than a new description each time.",
  },
  {
    title: "Long-term supply",
    text: "The aim is a working relationship with distributors and professional buyers who reorder from the catalogue.",
  },
] as const;

export function ManufacturingPageContent() {
  return (
    <div className="bg-white">
      <section className="overflow-hidden bg-[#042848]">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              Manufacturing
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl">
              Precision, Craftsmanship &amp; Manufacturing
            </h1>
            <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg">
              AZ Instruments is based in Sialkot, Pakistan, and supplies dental, orthopedic, and
              orthodontic instruments. The work is centred on the detail of each pattern and on a
              finish that matches what the buyer has been shown.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" className="h-12 px-6">
                Explore Our Products
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                Contact Us
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
        <Container className="grid items-start gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Manufacturing overview
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              How an instrument is prepared for a buyer
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-navy/75">
            <p>
              AZ Instruments supplies named patterns from Sialkot. Craftsmanship, on this page,
              means attention to the shape, finish, and assembly of the instrument the buyer is
              reviewing, and to the notes that come with an order.
            </p>
            <p>
              {site.customDesign} Catalogue patterns stay under the names and photographs already
              published, so a quotation refers to a specific instrument.
            </p>
            <p>
              Factory size, machine lists, and output figures are not published here. They will be
              added only when AZ Instruments confirms them.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Production Capabilities
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              These are general areas of instrument work. They describe the kind of attention a
              pattern receives. They are not a statement that every step is carried out in one
              AZ Instruments facility. Confirmed notes can replace this wording later.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-[0_16px_40px_-28px_rgba(23,105,255,0.35)]"
              >
                <GearIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 text-xl font-bold tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
                Specialities
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Three instrument groups
              </h2>
              <p className="mt-4 text-base leading-7 text-navy/75">
                Photographs below are from the current catalogue. Each card opens the product list.
              </p>
            </div>
            <ButtonLink href="/products" variant="outline" className="shrink-0">
              Explore Our Products
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
                      <h3 className="text-2xl font-bold tracking-tight text-navy">{category.title}</h3>
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

      <section className="border-y border-line bg-[#042848]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
              Attention to detail
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What is checked against the pattern
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {details.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <InspectIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Supply
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Manufacturing &amp; Supply Commitment
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/75">
              The commitment is commercial as well as practical: understand the requirement, present
              the instrument clearly, and keep later orders aligned with what was agreed.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-ice/40 p-6">
                <SupportIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-3">
            <HandshakeIcon className="mt-0.5 h-6 w-6 shrink-0 text-blue" />
            <p className="max-w-3xl text-base leading-7 text-navy/75">
              {site.inquiryNote}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#042848] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <ShieldIcon className="h-8 w-8 text-blue" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Let&apos;s Discuss Your Instrument Requirements
                </h2>
                <p className="mt-4 text-base leading-7 text-white/75">
                  International buyers can write to AZ Instruments about a catalogue pattern or a
                  custom requirement, and about a longer supply arrangement.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                  Contact Us
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref(
                    "Hello AZ Instruments, I would like to discuss instrument requirements.",
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
