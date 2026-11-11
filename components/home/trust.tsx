import { Container } from "@/components/layout/container";
import { HandshakeIcon, ShieldIcon, TruckIcon, UsersIcon } from "@/components/ui/icons";
import { trustPoints } from "@/lib/site";

const icons = [ShieldIcon, UsersIcon, TruckIcon, HandshakeIcon];

export function Trust() {
  return (
    <section className="border-y border-line bg-white" aria-label="Buyer notes">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:gap-7 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line lg:py-10">
        {trustPoints.map((point, index) => {
          const Icon = icons[index];
          if (!Icon) {
            return null;
          }
          return (
            <div
              key={point.title}
              className="flex items-center justify-start gap-2.5 text-left max-[599px]:justify-start! sm:gap-3.5 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              <Icon className="h-7 w-7 shrink-0 text-blue sm:h-9 sm:w-9" />
              <div className="min-w-0 text-left">
                <h2 className="text-left text-sm font-semibold text-navy sm:text-base">{point.title}</h2>
                <p className="mt-0.5 text-left text-xs text-muted sm:text-sm">{point.text}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
