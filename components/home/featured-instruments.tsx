import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredInstrumentSlugs } from "@/lib/catalogue";
import { getProduct } from "@/lib/products";

export function FeaturedInstruments() {
  const instruments = featuredInstrumentSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (instruments.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Selected Instruments
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Explore Our Instruments
            </h2>
          </div>
          <ButtonLink href="/products" variant="outline" className="shrink-0">
            View Full Catalogue
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-7">
          {instruments.map((instrument) => (
            <li key={instrument.slug}>
              <ProductCard product={instrument} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
