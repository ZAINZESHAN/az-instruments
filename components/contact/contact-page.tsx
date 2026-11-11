import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { PinIcon, SupportIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ContactInquiryForm, ProductInquiryForm } from "@/components/contact/inquiry-forms";
import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(
  `${site.address.line1}, ${site.address.line2}`,
);

export function ContactPageContent() {
  return (
    <div className="bg-white">
      <section className="overflow-hidden bg-[#042848]">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              Contact
            </p>
            <h1 className="mt-4 type-display text-white">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-5 type-lead text-white/85">
              International buyers, distributors, and healthcare instrument businesses can contact
              AZ Instruments for product information, quotations, and business enquiries.
            </p>
            <a href={site.email.href} className="mt-6 inline-block text-sm font-semibold text-white hover:text-ice">
              {site.email.display}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.whatsapp.href} variant="whatsapp" className="h-12 px-6">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp {site.whatsapp.display}
              </ButtonLink>
              <ButtonLink href="#product-enquiry" variant="outline" className="h-12 px-6">
                Product enquiry
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-[#063556] p-6 sm:p-8">
            <h2 className="type-sub text-white">Send a message</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              For a general enquiry. Required fields are checked before the message is sent.
            </p>
            <div className="mt-6">
              <ContactInquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Reach us
            </p>
            <h2 className="mt-3 type-section text-navy">
              Contact information
            </h2>
            <p className="mt-4 text-base leading-7 text-navy/75">
              Write to{" "}
              <a href={site.email.href} className="font-semibold text-blue">
                {site.email.display}
              </a>
              , or use WhatsApp and the phone numbers below.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            <li className="rounded-2xl border border-line bg-ice/40 p-6">
              <SupportIcon className="h-7 w-7 text-blue" />
              <h3 className="mt-4 text-sm font-semibold tracking-[0.14em] text-blue uppercase">Company</h3>
              <p className="mt-2 text-lg font-bold text-navy">{site.name}</p>
              <a href={site.email.href} className="mt-2 block text-sm font-semibold text-navy hover:text-blue">
                {site.email.display}
              </a>
            </li>
            <li className="rounded-2xl border border-line bg-ice/40 p-6">
              <PinIcon className="h-7 w-7 text-blue" />
              <h3 className="mt-4 text-sm font-semibold tracking-[0.14em] text-blue uppercase">Location</h3>
              <p className="mt-2 text-base leading-7 font-semibold text-navy">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-ice/40 p-6">
              <WhatsAppIcon className="h-7 w-7 text-teal" />
              <h3 className="mt-4 text-sm font-semibold tracking-[0.14em] text-blue uppercase">
                WhatsApp / Phone
              </h3>
              <div className="mt-2 space-y-1">
                <a
                  href={site.whatsapp.href}
                  className="block text-base font-semibold text-navy hover:text-blue"
                >
                  WhatsApp {site.whatsapp.display}
                </a>
                {site.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="block text-sm font-semibold text-navy/80 hover:text-blue">
                    {phone.display}
                  </a>
                ))}
              </div>
            </li>
          </ul>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Map of AZ Instruments, Sialkot"
              src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section id="product-enquiry" className="border-t border-line bg-ice">
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">Product enquiry</p>
            <h2 className="mt-3 type-section text-navy">
              Tell us what you need
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-navy/75">
              Use this form for a named instrument, a bulk order, OEM work, or a custom requirement.
              Share the category, quantity, and any specification you already have.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-line bg-white p-6 sm:p-8">
              <ProductInquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
