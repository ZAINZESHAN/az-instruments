import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Inquiry() {
  return (
    <section id="inquiry" className="scroll-mt-24 bg-ice">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:py-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-blue uppercase">
            Inquiry
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Request a quotation
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-navy/75">
            {site.inquiryNote}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.whatsapp.href} variant="whatsapp">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp {site.whatsapp.display}
            </ButtonLink>
            <ButtonLink href={site.phones[1].href} variant="outline">
              Call {site.phones[1].display}
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-2xl border border-white bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-blue uppercase">
            Address
          </h3>
          <address className="mt-3 text-base leading-7 text-navy not-italic">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <h3 className="mt-6 text-sm font-semibold tracking-[0.14em] text-blue uppercase">
            Email
          </h3>
          <a href={site.email.href} className="mt-3 inline-block text-base font-medium text-navy hover:text-blue">
            {site.email.display}
          </a>
          <h3 className="mt-6 text-sm font-semibold tracking-[0.14em] text-blue uppercase">
            Phone
          </h3>
          <ul className="mt-3 space-y-2">
            {site.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="text-base font-medium text-navy hover:text-blue">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
