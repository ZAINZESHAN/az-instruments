import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  href: string;
  title: string;
  summary: string;
  count: number;
  image: string;
  alt: string;
};

export function CategoryCard({ href, title, summary, count, image, alt }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue hover:shadow-md"
    >
      <div className="relative aspect-square border-b border-line bg-white">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-contain p-8"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
          {count} {count === 1 ? "instrument" : "instruments"}
        </p>
        <h2 className="mt-2 type-sub text-navy">{title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-navy/70">{summary}</p>
        <span className="mt-5 text-sm font-semibold text-blue group-hover:text-blue-deep">
          View Products
        </span>
      </div>
    </Link>
  );
}
