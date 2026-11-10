import Link from "next/link";
import { Container } from "@/components/layout/container";

type PlaceholderPageProps = {
  title: string;
  message: string;
};

export function PlaceholderPage({ title, message }: PlaceholderPageProps) {
  return (
    <Container className="py-16 sm:py-24">
      <p className="text-sm font-semibold tracking-[0.16em] text-blue uppercase">
        AZ Instruments
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">{message}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-lg border border-line px-5 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
      >
        Back to Home
      </Link>
    </Container>
  );
}
