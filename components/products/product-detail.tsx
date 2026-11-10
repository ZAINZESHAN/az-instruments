import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { productInquiryMessage, quoteHref, whatsappHref } from "@/lib/inquiry";
import {
  getCategoryTitle,
  getGroupName,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const related = getRelatedProducts(product);
  const categoryTitle = getCategoryTitle(product.categoryId);
  const groupName = getGroupName(product.groupId);
  const hasDetailContent =
    Boolean(product.overview) ||
    product.applications.length > 0 ||
    product.features.length > 0 ||
    product.specs.length > 0;

  return (
    <div className="bg-white">
      <Container className="py-10 sm:py-14">
        <p className="text-sm text-muted">
          <Link href="/products" className="hover:text-blue">
            Products
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{categoryTitle}</span>
          <span aria-hidden="true"> / </span>
          <span>{groupName}</span>
        </p>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-line bg-ice/50 shadow-[0_18px_40px_-28px_rgba(23,43,77,0.35)]">
              <div className="relative aspect-square">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-8 sm:p-12"
                />
              </div>
            </div>
            {product.images.length > 1 ? (
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {product.images.slice(1).map((image) => (
                  <li
                    key={image.src}
                    className="overflow-hidden rounded-2xl border border-line bg-ice/50"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-contain p-4"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
              {categoryTitle}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-navy/70">{groupName}</p>
            {product.catalogueCode ? (
              <p className="mt-4 text-sm font-semibold text-navy">
                Product code <span className="text-blue">{product.catalogueCode}</span>
              </p>
            ) : null}
            {product.figure ? (
              <p className="mt-2 text-sm text-navy/70">
                Catalogue figure <span className="font-semibold text-navy">{product.figure}</span>
              </p>
            ) : null}

            {product.overview ? (
              <>
                <h2 className="mt-8 text-lg font-bold text-navy">Overview</h2>
                <p className="mt-2 text-base leading-7 text-navy/80">{product.overview}</p>
              </>
            ) : null}

            {product.applications.length > 0 ? (
              <>
                <h2 className="mt-8 text-lg font-bold text-navy">Primary uses</h2>
                <ul className="mt-3 space-y-2">
                  {product.applications.map((application) => (
                    <li key={application} className="flex gap-3 text-sm leading-6 text-navy/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {product.features.length > 0 ? (
              <>
                <h2 className="mt-8 text-lg font-bold text-navy">Key design features</h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-navy/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {product.specs.length > 0 ? (
              <>
                <h2 className="mt-8 text-lg font-bold text-navy">Specifications</h2>
                <p className="mt-2 text-xs leading-5 text-muted">
                  Only details confirmed from the product photograph or AZ Instruments listing are shown.
                </p>
                <dl className="mt-3 divide-y divide-line border-y border-line">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-[8rem_1fr] gap-3 py-3 text-sm">
                      <dt className="font-semibold text-navy">{spec.label}</dt>
                      <dd className="text-navy/80">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {!hasDetailContent ? (
              <p className="mt-8 text-base leading-7 text-navy/80">
                Detailed product copy for this instrument is being prepared. Use the product name when
                requesting a quotation.
              </p>
            ) : null}

            <p className="mt-6 text-xs leading-5 text-muted">
              Photograph supplied by AZ Instruments. Use the product name shown here when requesting a
              quotation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref(product)}>Request a Quote</ButtonLink>
              <ButtonLink href={whatsappHref(productInquiryMessage(product))} variant="whatsapp">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp inquiry
              </ButtonLink>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-navy">Related instruments</h2>
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
