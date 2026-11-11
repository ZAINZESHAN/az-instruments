import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { QUOTE_FORM_HREF } from "@/lib/inquiry";

export function EnquiryCta() {
  return (
    <section className="bg-ice">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="type-section text-navy">
            Looking for the Right Instruments?
          </h2>
          <p className="mt-4 type-lead text-navy/75">
            Buyers and distributors can explore the catalogue, or send the product
            name and AZI catalogue number when they want to discuss a requirement.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/products" className="h-12 px-6">
              Explore Catalogue
            </ButtonLink>
            <ButtonLink href={QUOTE_FORM_HREF} variant="outline" className="h-12 bg-white px-6">
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
