import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-sm shadow-navy/5">
      <Container wide className="flex h-14 items-center gap-2.5 sm:h-16 sm:gap-3 xl:h-[4.25rem] xl:gap-5">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={593}
            height={292}
            priority
            className="h-8 w-auto shrink-0 sm:h-10"
          />
          <span className="truncate text-[13px] font-bold tracking-tight text-navy sm:text-[15px]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 justify-center min-[1440px]:flex" aria-label="Primary">
          <PrimaryNav
            className="flex items-center gap-x-3 2xl:gap-x-5"
            linkClassName="whitespace-nowrap text-[13px] font-semibold"
          />
        </nav>

        <div className="ml-auto hidden items-center gap-2 min-[1440px]:flex">
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${site.whatsapp.display}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal text-white transition-colors hover:bg-teal-deep"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <ButtonLink href="/contact">Request a Quote</ButtonLink>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
