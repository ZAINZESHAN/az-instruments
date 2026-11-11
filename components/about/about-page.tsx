import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import {
  GlobeIcon,
  HandshakeIcon,
  InspectIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { brandMedia } from "@/lib/brand-media";
import { whatsappHref } from "@/lib/inquiry";
import { divisions, site } from "@/lib/site";

const aboutImage = brandMedia.aboutHero;

const membership = {
  document: "Membership Certificate",
  authority: "The Sialkot Chamber of Commerce & Industry",
  affiliation: "Federation of Pakistan Chambers of Commerce & Industry",
  memberName: "A.Z. Instruments Company",
  address: "Street No. 1, Kacha Shahab Road, Sialkot",
  ntn: "3619346-1",
  memberSince: "27 November 2010",
  validUntil: "31 March 2027",
  givenOn: "18 July 2026",
  serialNo: "B 2074954",
  bookNo: "B 20750",
  reference: "A-25540",
} as const;

const membershipFacts = [
  { label: "Document", value: membership.document },
  { label: "Issuing authority", value: membership.authority },
  { label: "Affiliation", value: membership.affiliation },
  { label: "Member name", value: membership.memberName },
  { label: "Address on certificate", value: membership.address },
  { label: "N.T.N.", value: membership.ntn },
  { label: "Member since", value: membership.memberSince },
  { label: "Valid until", value: membership.validUntil },
  { label: "Certificate given on", value: membership.givenOn },
  { label: "Serial No.", value: membership.serialNo },
  { label: "Book No.", value: membership.bookNo },
  { label: "Reference", value: membership.reference },
] as const;

const reasons = [
  {
    title: "Named catalogue patterns",
    text: "Each listed instrument keeps the pattern name buyers use when they request a quotation.",
  },
  {
    title: "Three sourcing groups",
    text: "Dental, orthopedic, and orthodontic instruments are organised so a buyer can review a speciality directly.",
  },
  {
    title: "Custom patterns on request",
    text: "A design can be produced from the buyer's drawing, sample, or specification.",
  },
  {
    title: "Chamber membership on record",
    text: "A.Z. Instruments Company is a member of the Sialkot Chamber of Commerce & Industry, with membership dated from 27 November 2010.",
  },
] as const;

export function AboutPageContent() {
  return (
    <div className="bg-white">
      <section className="relative h-[46rem] w-full overflow-hidden bg-[#042848] sm:h-[42rem] lg:h-[52rem]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={aboutImage.src}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes="100vw"
            className="scale-110 object-cover object-left blur-3xl"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, #042848 0%, #053056 26%, rgba(6,62,112,0.94) 46%, rgba(8,92,158,0.62) 62%, rgba(12,120,190,0.2) 76%, transparent 90%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[60%]"
          style={{
            WebkitMaskImage: "linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
            maskImage: "linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
          }}
        >
          <Image
            src={aboutImage.src}
            alt={aboutImage.alt}
            fill
            priority
            quality={100}
            unoptimized
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-left"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[#042848]/50 lg:hidden" />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full max-w-[34rem] py-12 pl-8 pr-[max(1.5rem,calc((100vw-100rem)/2+1.5rem))] sm:max-w-[44rem] sm:pr-[max(2rem,calc((100vw-100rem)/2+2rem))] lg:max-w-[52rem] lg:py-0 lg:pr-[max(2.5rem,calc((100vw-100rem)/2+2.5rem))]">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              About Us
            </p>
            <h1 className="mt-4 type-display text-white">
              Dental, Orthopedic &amp; Orthodontic Instruments from Sialkot
            </h1>
            <p className="mt-5 type-lead text-white/85">
              AZ Instruments supplies dental, orthopedic, and orthodontic instruments to
              professional buyers and distributors. The business, recorded on its chamber
              membership as A.Z. Instruments Company, is based at Street No. 1, Kacha Shahab
              Road, Sialkot, Pakistan.
            </p>
            <p className="mt-4 text-base leading-7 text-white/75">
              Buyers can review named patterns in the catalogue and request a quotation, or
              ask for an instrument made to a drawing, sample, or specification.
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
        </div>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
                Our Story
              </p>
              <h2 className="mt-3 type-section text-navy">
                A Sialkot firm with chamber membership since 2010
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-navy/75">
              <p>
                A.Z. Instruments Company is a member of the Sialkot Chamber of Commerce &amp;
                Industry. The membership certificate records that membership from{" "}
                {membership.memberSince}. The current certificate was given on {membership.givenOn}{" "}
                and remains valid until {membership.validUntil}.
              </p>
              <p>
                The address on that certificate is {membership.address}, the same street address
                published for AZ Instruments. The catalogue is the working record of the
                instruments offered to buyers: dental, orthopedic, and orthodontic patterns, each
                shown under its own name.
              </p>
              <p>
                A founding year is not printed on the membership certificate, so none is stated
                here. What is on record is the chamber membership date and the current catalogue.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Who We Are
            </p>
            <h2 className="mt-3 type-section text-navy">
              A supplier organised around three instrument groups
            </h2>
            <p className="mt-5 type-lead text-navy/75">
              {site.description} The public catalogue is limited to the patterns that have been
              prepared for buyers to review, rather than a general claim about every instrument
              made in Sialkot.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {divisions.map((division) => (
              <li
                key={division.index}
                className="rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-[0_16px_40px_-28px_rgba(23,105,255,0.35)]"
              >
                <span className="text-sm font-semibold tracking-[0.16em] text-blue">
                  {division.index}
                </span>
                <h3 className="mt-3 type-sub text-navy">{division.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{division.summary}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Our Mission &amp; Vision
            </p>
            <h2 className="mt-3 type-section text-navy">
              Clear instruments. Direct quotations.
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            <li className="rounded-2xl border border-line bg-ice/50 p-8">
              <InspectIcon className="h-8 w-8 text-blue" />
              <h3 className="mt-5 type-sub text-navy">Mission</h3>
              <p className="mt-3 text-base leading-7 text-navy/75">
                To present dental, orthopedic, and orthodontic instruments under the names buyers
                can quote, and to answer enquiries with the product, quantity, and any custom
                requirement stated plainly.
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-ice/50 p-8">
              <GlobeIcon className="h-8 w-8 text-blue" />
              <h3 className="mt-5 type-sub text-navy">Vision</h3>
              <p className="mt-3 text-base leading-7 text-navy/75">
                To be a straightforward Sialkot source for professional buyers who want a readable
                catalogue and a direct conversation about the instruments they need.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
                What We Offer
              </p>
              <h2 className="mt-3 type-section text-navy">
                Catalogue patterns and custom work
              </h2>
            </div>
            <ButtonLink href="/products" variant="outline" className="shrink-0 bg-white">
              Explore Our Products
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-7 text-navy/75">{site.selectedRange}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-navy/75">{site.customDesign}</p>
          <div className="mt-8">
            <ButtonLink href="/oem" variant="outline" className="bg-white">
              OEM &amp; Private Label
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Quality &amp; Commitment
            </p>
            <h2 className="mt-3 type-section text-navy">
              Chamber membership, as printed
            </h2>
            <p className="mt-5 text-base leading-7 text-navy/75">
              The document on file is a membership certificate of {membership.authority}. It
              certifies that {membership.memberName} is a member of the chamber. It is not a
              product-test report and it does not name a quality-management standard. Only the
              details printed on the certificate are shown below.
            </p>
          </div>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {membershipFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-line bg-ice/40 px-5 py-5">
                <dt className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base font-semibold leading-6 text-navy">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-muted">
            The certificate is signed for the chamber by Moazzam Ishaq, Deputy Secretary
            (Membership), and countersigned by Salman Shehzad, Vice President. The G.S.T. number
            line on the certificate is blank, so no G.S.T. number is published here.
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-[#042848]">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
              Our Experience
            </p>
            <p className="mt-4 type-stat text-white">15</p>
            <p className="mt-2 text-lg font-semibold text-white/85">
              years, as stated by the company
            </p>
          </div>
          <div className="space-y-4 text-base leading-7 text-white/80">
            <p>
              AZ Instruments states approximately {site.company.experienceYears} years of industry
              experience. The membership certificate supports a longer public record of the firm:
              membership of the Sialkot Chamber of Commerce &amp; Industry since{" "}
              {membership.memberSince}.
            </p>
            <p>
              That date is a membership date, not a founding year. Until a founding year is
              confirmed separately, the site does not publish one.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Why Choose AZ Instruments
            </p>
            <h2 className="mt-3 type-section text-navy">
              What a buyer can check before enquiring
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li key={reason.title} className="rounded-2xl border border-line bg-white p-7">
                <HandshakeIcon className="h-7 w-7 text-blue" />
                <h3 className="mt-4 type-sub text-navy">{reason.title}</h3>
                <p className="mt-2 text-sm leading-7 text-navy/75">{reason.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-ice">
        <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Our Location
            </p>
            <h2 className="mt-3 type-section text-navy">
              Sialkot, Pakistan
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/75">
              The address used for enquiries matches the address printed on the chamber
              membership certificate.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-8">
            <PinIcon className="h-8 w-8 text-blue" />
            <p className="mt-5 text-lg font-bold text-navy">{site.name}</p>
            <p className="mt-2 text-base leading-7 text-navy/75">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <a href={site.email.href} className="mt-4 block text-sm font-semibold text-navy hover:text-blue">
              {site.email.display}
            </a>
            <p className="mt-2 text-sm text-muted">
              {site.phones.map((phone) => phone.display).join(" · ")}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#042848] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-sm">
                  Contact
                </p>
                <h2 className="mt-3 type-section text-white">
                  Discuss a requirement or request a quotation
                </h2>
                <p className="mt-4 text-base leading-7 text-white/75">
                  International buyers can send the instrument name, quantity, and destination.
                  Custom work can be discussed from a drawing, sample, or specification.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="h-12 px-6">
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                  Contact Us
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref(
                    "Hello AZ Instruments, I would like to discuss an instrument requirement.",
                  )}
                  variant="whatsapp"
                  className="h-12 px-6"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
