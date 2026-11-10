import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { InspectIcon, ShieldIcon, SupportIcon } from "@/components/ui/icons";

const points = [
  {
    title: "Sialkot manufacturing base",
    text: "Dental, orthopedic, and orthodontic instruments supplied from Sialkot, Pakistan.",
    icon: SupportIcon,
  },
  {
    title: "Quality-focused process",
    text: "Quality and manufacturing notes stay on their own pages with confirmed company information only.",
    icon: ShieldIcon,
  },
  {
    title: "Clear buyer documentation",
    text: "Use the product name shown in the catalogue when requesting a quotation.",
    icon: InspectIcon,
  },
] as const;

export function QualityPreview() {
  return (
    <section className="overflow-hidden border-y border-line bg-ice">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
            Quality &amp; Manufacturing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Craftsmanship You Can Inspect
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/75 sm:text-lg">
            AZ Instruments supplies dental, orthopedic, and orthodontic instruments
            from Sialkot. Quality and manufacturing notes stay on their own pages
            and use confirmed company information only.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3 sm:gap-6">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <li
                key={point.title}
                className="rounded-2xl border border-line bg-white px-6 py-7 text-left shadow-[0_16px_40px_-28px_rgba(23,43,77,0.4)]"
              >
                <Icon className="h-8 w-8 text-blue" />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-navy">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-navy/70">{point.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/quality">Explore Our Quality</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
