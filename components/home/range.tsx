import { Container } from "@/components/layout/container";
import { divisions, site } from "@/lib/site";

export function Range() {
  return (
    <section id="range" className="scroll-mt-24 bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-blue uppercase">
            Selected range
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Dental, orthopedic, and orthodontic instruments
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">{site.quotationNote}</p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {divisions.map((division) => (
            <li
              key={division.index}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-36 items-end bg-ice px-6 pb-5">
                <span className="text-5xl leading-none font-bold tracking-tight text-blue">
                  {division.index}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold tracking-tight text-navy">
                  {division.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{division.summary}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-muted">
          {site.customDesign}
        </p>
      </Container>
    </section>
  );
}
