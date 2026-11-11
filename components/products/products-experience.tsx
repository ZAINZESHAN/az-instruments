import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { brandMedia } from "@/lib/brand-media";
import { whatsappHref } from "@/lib/inquiry";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const heroImage = brandMedia.productsHero;
const catalogueProducts = [...products].reverse();

export function ProductsExperience() {
  return (
    <div className="bg-white">
      <section className="relative h-[32rem] w-full overflow-hidden bg-[#042848] sm:h-[42rem] lg:h-[52rem]">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroImage.src}
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
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={100}
            unoptimized
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[52rem] px-6 py-12 min-[600px]:pr-8 min-[600px]:pl-[max(1.5rem,calc((100vw-100rem)/2+1.5rem))] sm:pl-[max(2rem,calc((100vw-100rem)/2+2rem))] lg:py-0 lg:pl-[max(2.5rem,calc((100vw-100rem)/2+2.5rem))]">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm">
              Product catalogue
            </p>
            <h1 className="mt-4 type-display text-white">
              Our Surgical Instruments
            </h1>
            <p className="mt-5 type-lead text-white/85">
              Browse AZ Instruments&apos; range of surgical, dental, and orthodontic
              instruments for professional buyers and distributors. Each pattern is
              shown with its photograph from our approved catalogue collection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#product-collection" className="h-12 px-6">
                Explore Our Products
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
                Request a Quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="product-collection" className="scroll-mt-24 bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
                Full collection
              </p>
              <h2 className="mt-3 type-section text-navy">
                All Instruments
              </h2>
              <p className="mt-3 text-base leading-7 text-navy/70">
                {products.length} instruments with approved product photographs.
              </p>
            </div>
            <ButtonLink href="/contact" variant="outline" className="shrink-0 bg-white">
              Request a Quote
            </ButtonLink>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-7">
            {catalogueProducts.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line bg-ice">
        <Container className="flex flex-col gap-6 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Request a quotation</h2>
            <p className="mt-3 text-base leading-7 text-navy/75">
              Send the instrument name and the quantity you need. A pattern can also be
              discussed from your drawing or sample.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Request a Quote</ButtonLink>
            <ButtonLink
              href={whatsappHref(
                "Hello AZ Instruments, I would like to enquire about surgical instruments.",
              )}
              variant="whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp {site.whatsapp.display}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
