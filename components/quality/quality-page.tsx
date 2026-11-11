import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import {
  HandshakeIcon,
  InspectIcon,
  ShieldIcon,
  SupportIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { whatsappHref } from "@/lib/inquiry";
import { site } from "@/lib/site";

const banner = {
  src: "/brand/quality-instruments-banner.png",
  alt: "Surgical instruments laid out on a blue surface beside a document clipboard",
  width: 1024,
  height: 558,
} as const;

const commitments = [
  {
    title: "Finishing and detail",
    text: "Instruments are prepared with attention to how the working ends, joints, and handles are finished before they are offered to a buyer.",
  },
  {
    title: "Product consistency",
    text: "Repeat orders should match the pattern a buyer has already reviewed in the catalogue, under the same product name.",
  },
  {
    title: "Handling and inspection",
    text: "Instruments are handled with care and looked over before supply, so obvious finish or assembly issues can be caught.",
  },
  {
    title: "Buyer specifications",
    text: "Where a buyer provides a drawing, sample, or written specification, that requirement is the reference for the work.",
  },
] as const;

const relationships = [
  {
    title: "Buyer requirements",
    text: "An enquiry starts from the instrument name, quantity, and any specification the buyer provides.",
  },
  {
    title: "Consistency",
    text: "The aim is to supply the same agreed pattern from one order to the next.",
  },
  {
    title: "Clear communication",
    text: "Questions about a pattern, a custom request, or a quotation are answered directly.",
  },
  {
    title: "Long-term supply",
    text: "The working relationship is built on repeat orders and a catalogue buyers can return to.",
  },
] as const;

/**
 * Replace this list when official documents are ready.
 * Add `image` and verified fields (authority, number, dates) only from the real certificate.
 */
const certificates = [
  {
    title: "Official Certification",
    status: "Certificate Under Preparation",
    description:
      "Our certification documentation is currently being prepared for publication. Official details and supporting documents will be added once available.",
  },
] as const;

export function QualityPageContent() {
  return (
    <div className="bg-white">
      <section className="relative h-[32rem] w-full overflow-hidden bg-[#042848] sm:h-[42rem] lg:h-[52rem]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={banner.src}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes="100vw"
            className="scale-110 object-cover object-right blur-3xl"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #042848 0%, #053056 20%, rgba(6,62,112,0.94) 36%, rgba(8,92,158,0.55) 50%, rgba(12,120,190,0.18) 62%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[60%]"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
            maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
          }}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            priority
            quality={100}
            unoptimized
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[52rem] py-12 pr-8 pl-[max(1.5rem,calc((100vw-100rem)/2+1.5rem))] sm:pl-[max(2rem,calc((100vw-100rem)/2+2rem))] lg:py-0 lg:pl-[max(2.5rem,calc((100vw-100rem)/2+2.5rem))]">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              Quality &amp; Certificates
            </p>
            <h1 className="mt-4 max-w-[40rem] type-display text-white">
              Quality &amp; Commitment
            </h1>
            <p className="mt-5 max-w-[38rem] type-lead text-white/85">
              AZ Instruments supplies surgical and dental instruments with attention to finish,
              consistency, and the requirements a buyer sets out for the order.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" className="h-12 px-6">
                Contact Our Team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Quality commitment
            </p>
            <h2 className="mt-3 type-section text-navy">
              How instruments are prepared for supply
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              Quality here means a finished instrument that matches the pattern being offered,
              handled carefully, and checked before it is sent. Specific test methods are not
              listed until they are confirmed.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {commitments.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-ice/40 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:bg-white hover:shadow-[0_16px_40px_-28px_rgba(23,105,255,0.35)]"
              >
                <ShieldIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 type-sub text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-[#042848]">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
              Quality control &amp; inspection
            </p>
            <h2 className="mt-3 type-section text-white">
              A look at the instrument before it is supplied
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-white/80">
            <p>
              Inspection is part of preparing an instrument for a buyer. The piece is reviewed
              against the pattern and the notes agreed for that order, and anything that does not
              look ready is kept back from supply.
            </p>
            <p>
              The check is a practical review of the finished instrument. It is not presented
              here as a named laboratory method or a published technical standard.
            </p>
            <div className="flex items-center gap-3 pt-2 text-white">
              <InspectIcon className="h-7 w-7 shrink-0 text-blue" />
              <p className="text-sm font-semibold leading-6">
                Checked against the agreed pattern before supply.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ice">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Documentation
            </p>
            <h2 className="mt-3 type-section text-navy">
              Certifications &amp; Documentation
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              Official certificates will be published here when the documents are ready. Nothing
              is shown as certified until that file and its details are in place.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {certificates.map((certificate) => (
              <li
                key={certificate.title}
                className="rounded-[1.75rem] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(23,43,77,0.35)] sm:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice">
                  <ShieldIcon className="h-7 w-7 text-blue" />
                </div>
                <h3 className="mt-6 type-sub text-navy">
                  {certificate.title}
                </h3>
                <p className="mt-4 inline-flex rounded-full bg-ice px-3 py-1 text-xs font-semibold tracking-wide text-blue uppercase">
                  {certificate.status}
                </p>
                <p className="mt-4 text-base leading-7 text-navy/75">{certificate.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Customer commitment
            </p>
            <h2 className="mt-3 type-section text-navy">
              Working with professional buyers
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relationships.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-6">
                <SupportIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-3 text-navy">
            <HandshakeIcon className="mt-0.5 h-6 w-6 shrink-0 text-blue" />
            <p className="text-base leading-7 text-navy/75">
              A quotation uses the product name from the catalogue, plus quantity and any custom
              note the buyer sends.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#042848] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="type-section text-white">
                  Looking for a Reliable Surgical Instruments Supplier?
                </h2>
                <p className="mt-4 text-base leading-7 text-white/75">
                  International buyers can contact AZ Instruments to discuss products and supply.
                  Send the instrument name and the quantity you need.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                  Contact Us
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref(
                    "Hello AZ Instruments, I would like to discuss surgical instruments.",
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
