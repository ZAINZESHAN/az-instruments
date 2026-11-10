import { Container } from "@/components/layout/container";

/**
 * No official certification artwork is in the project.
 * CS, the exact ISO standard, and the MDR document scope are still unconfirmed,
 * so this preview stays in development and the live homepage renders nothing.
 */
const showDevelopmentPlaceholders = process.env.NODE_ENV === "development";

const placeholders = [
  {
    name: "CS",
    note: "Exact mark not confirmed",
  },
  {
    name: "ISO",
    note: "Exact standard not confirmed",
  },
  {
    name: "MDR",
    note: "Scope not confirmed",
  },
] as const;

export function ComplianceStrip() {
  if (!showDevelopmentPlaceholders) {
    return null;
  }

  return (
    <section className="border-t border-line bg-white" aria-label="Certification preview">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Certifications &amp; Regulatory Compliance
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Our certifications and regulatory documentation support our commitment to
            quality and applicable requirements.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
          {placeholders.map((item) => (
            <li key={item.name}>
              <div className="flex h-full min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-ice/50 px-6 py-10 text-center shadow-[0_12px_36px_-28px_rgba(23,43,77,0.45)] sm:min-h-52">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
                  Placeholder
                </span>
                <span className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {item.name}
                </span>
                <span className="mt-3 max-w-[14rem] text-sm leading-6 text-muted">
                  {item.note}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-muted sm:text-sm sm:leading-6">
          Development preview only. These names are not confirmed marks and are omitted
          from the live site.
        </p>
      </Container>
    </section>
  );
}
