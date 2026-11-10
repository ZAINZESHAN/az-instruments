import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { getProduct, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product" };
  }
  const code = product.catalogueCode ? ` (${product.catalogueCode})` : "";
  const description =
    product.seoDescription ??
    (product.overview
      ? `${product.name}${code}. ${product.overview}`
      : `${product.name}${code} from AZ Instruments. Request a quotation with this product name.`);
  return {
    title: product.name,
    description: description.slice(0, 160),
    openGraph: {
      title: `${product.name} | AZ Instruments`,
      description: description.slice(0, 160),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}
