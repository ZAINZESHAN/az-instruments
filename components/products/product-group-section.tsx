import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/lib/products";

type ProductGroupSectionProps = {
  id: string;
  title: string;
  products: Product[];
};

export function ProductGroupSection({ id, title, products }: ProductGroupSectionProps) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
        <h3 className="type-sub text-navy">{title}</h3>
        <p className="shrink-0 text-sm text-muted">
          {products.length} {products.length === 1 ? "instrument" : "instruments"}
        </p>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.slug} className="h-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
