import { Container } from "@/components/layout/container";
import { HandshakeIcon, ShieldIcon, TruckIcon, UsersIcon } from "@/components/ui/icons";
import { trustPoints } from "@/lib/site";

const icons = [ShieldIcon, UsersIcon, TruckIcon, HandshakeIcon];

export function Trust() {
  return (
    <section className="border-y border-line bg-white" aria-label="Buyer notes">
      <Container className="grid gap-7 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line lg:py-10">
        {trustPoints.map((point, index) => {
          const Icon = icons[index];
          if (!Icon) {
            return null;
          }
          return (
            <div key={point.title} className="flex items-center gap-3.5 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <Icon className="h-9 w-9 shrink-0 text-blue" />
              <div>
                <h2 className="text-base font-semibold text-navy">{point.title}</h2>
                <p className="mt-0.5 text-sm text-muted">{point.text}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
