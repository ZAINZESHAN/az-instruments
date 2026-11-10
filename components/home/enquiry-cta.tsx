import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export function EnquiryCta() {
  return (
    <section className="bg-ice">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Looking for the Right Instruments?
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/75 sm:text-lg">
            Buyers and distributors can explore the catalogue, or send the product
            name and AZI catalogue number when they want to discuss a requirement.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/products" className="h-12 px-6">
              Explore Catalogue
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
