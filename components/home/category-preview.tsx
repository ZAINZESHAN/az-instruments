import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { catalogueCategories, categoryIllustrations } from "@/lib/catalogue";

export function CategoryPreview() {
  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
            Explore Our Catalogue
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Instruments for Every Speciality
          </h2>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-7">
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
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/70 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line px-6 pt-5 pb-6">
                    <h3 className="text-2xl font-bold tracking-tight text-navy">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{category.summary}</p>
                    <span className="mt-5 text-sm font-semibold text-blue">
                      View products →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
