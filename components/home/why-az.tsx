import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { BookIcon, InspectIcon, ShieldIcon, SupportIcon } from "@/components/ui/icons";
import { brandMedia } from "@/lib/brand-media";

const benefits = [
  { title: "Specialized Instrument Categories", icon: BookIcon },
  { title: "Precision-Focused Product Selection", icon: InspectIcon },
  { title: "Quality-Conscious Approach", icon: ShieldIcon },
  { title: "B2B & Export Inquiry Support", icon: SupportIcon },
] as const;

const image = brandMedia.whyAz;

export function WhyAz() {
  return (
    <section className="overflow-hidden bg-navy">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm">
              Why AZ Instruments
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Instruments Crafted with Precision. Quality You Can Focus On.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
              AZ Instruments offers a range of dental, orthopedic, and orthodontic
              instruments for professional buyers seeking a dependable surgical
              instruments supplier from Sialkot.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li key={benefit.title} className="flex items-center gap-3">
                    <Icon className="h-6 w-6 shrink-0 text-blue" />
                    <span className="text-base font-semibold text-white">{benefit.title}</span>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-sm font-semibold text-blue underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10243f]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              quality={100}
              unoptimized
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
