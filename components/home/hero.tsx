import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { BookIcon, GearIcon, GlobeIcon, PinIcon } from "@/components/ui/icons";
import { brandMedia } from "@/lib/brand-media";
import { heroHighlights } from "@/lib/site";

const highlightIcons = [PinIcon, GlobeIcon, GearIcon, BookIcon];
const heroImage = brandMedia.homeHero;

function HeroHighlights({ onImage }: { onImage?: boolean }) {
  return (
    <ul
      className={
        onImage
          ? "grid w-full grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4 lg:gap-x-8"
          : "grid grid-cols-2 gap-x-6 gap-y-5"
      }
    >
      {heroHighlights.map((item, index) => {
        const Icon = highlightIcons[index];
        if (!Icon) {
          return null;
        }
        return (
          <li key={item.title} className="flex min-w-0 items-start gap-2">
            <Icon
              className={
                onImage
                  ? "mt-0.5 h-7 w-7 shrink-0 text-white"
                  : "mt-0.5 h-8 w-8 shrink-0 text-blue"
              }
            />
            <span>
              <span
                className={
                  onImage
                    ? "block text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                    : "block text-base font-semibold text-navy"
                }
              >
                {item.title}
              </span>
              <span
                className={
                  onImage
                    ? "mt-0.5 block text-xs text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                    : "mt-0.5 block text-sm text-muted"
                }
              >
                {item.text}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function HeroCopy({ onImage }: { onImage?: boolean }) {
  return (
    <div className={onImage ? "max-w-none" : "max-w-xl lg:max-w-[34rem]"}>
      <div className={onImage ? "max-w-[52rem]" : undefined}>
      <p
        className={
          onImage
            ? "text-xs font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-sm"
            : "text-xs font-semibold tracking-[0.18em] text-blue uppercase sm:text-sm"
        }
      >
        PRECISION INSTRUMENTS. GLOBAL REACH.
      </p>
      <h1
        className={
          onImage
            ? "mt-4 type-display text-white"
            : "mt-4 type-display text-navy"
        }
      >
        Premium Surgical &amp; Dental{" "}
        <span className={onImage ? "text-white" : "text-blue"}>Instruments</span>
      </h1>
      <p
        className={
          onImage
            ? "mt-5 type-lead text-white/85"
            : "mt-5 type-lead text-navy/80"
        }
      >
        Explore our range of surgical, dental and orthodontic instruments for
        professional buyers and distributors.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/products" className="h-12 px-6">
          Explore Our Products
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" className="h-12 bg-white px-6">
          Request a Quote
        </ButtonLink>
      </div>
      </div>
      {onImage ? (
        <div className="mt-12 lg:mt-20">
          <HeroHighlights onImage />
        </div>
      ) : null}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative h-[32rem] w-full overflow-hidden bg-[#042848] sm:h-[42rem] lg:h-[52rem]">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={heroImage.src}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="100vw"
          className="scale-110 object-cover object-right blur-3xl"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #042848 0%, #053056 20%, rgba(6,62,112,0.94) 36%, rgba(8,92,158,0.55) 50%, rgba(12,120,190,0.18) 62%, transparent 74%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[60%]"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
          maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 16%, #000 42%)",
        }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          quality={100}
          unoptimized
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-right"
        />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[52rem] py-12 pr-8 pl-[max(1.5rem,calc((100vw-100rem)/2+1.5rem))] sm:pl-[max(2rem,calc((100vw-100rem)/2+2rem))] lg:max-w-[68rem] lg:py-0 lg:pl-[max(2.5rem,calc((100vw-100rem)/2+2.5rem))]">
          <HeroCopy onImage />
        </div>
      </div>
    </section>
  );
}
