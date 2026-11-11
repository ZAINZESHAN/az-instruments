import Image from "next/image";
import Link from "next/link";
import { quoteHref } from "@/lib/inquiry";
import { getCategoryTitle, getGroupName, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const categoryTitle = getCategoryTitle(product.categoryId);
  const groupName = getGroupName(product.groupId);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_-24px_rgba(23,43,77,0.45)] transition duration-200 hover:-translate-y-0.5 hover:border-blue/50 hover:shadow-[0_18px_40px_-24px_rgba(23,105,255,0.35)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square bg-ice/60"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 100vw"
          className="object-contain p-7 transition duration-200 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col border-t border-line px-5 pt-4 pb-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-blue uppercase">
          {categoryTitle}
        </p>
        <p className="mt-1 text-xs text-muted">{groupName}</p>
        <h3 className="mt-2 line-clamp-2 min-h-12 text-[1.05rem] leading-6 font-bold tracking-tight text-navy">
          <Link href={`/products/${product.slug}`} className="hover:text-blue">
            {product.name}
          </Link>
        </h3>
        {product.catalogueCode ? (
          <p className="mt-2 text-sm font-semibold text-navy/65">{product.catalogueCode}</p>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-semibold text-blue transition-colors hover:text-blue-deep"
          >
            View Details
          </Link>
          <Link
            href={quoteHref(product)}
            className="text-sm font-semibold text-navy transition-colors hover:text-blue"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
