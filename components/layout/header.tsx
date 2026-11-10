import Image from "next/image";
import Link from "next/link";
import { CatalogueSearch } from "@/components/layout/catalogue-search";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-sm shadow-navy/5 backdrop-blur-sm">
      <Container wide className="relative flex h-16 items-center gap-3 xl:h-[4.5rem] xl:gap-5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={593}
            height={292}
            priority
            className="h-10 w-auto shrink-0 sm:h-11"
          />
          <span className="truncate text-[15px] font-bold tracking-tight text-navy">
            {site.name}
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 justify-center min-[1440px]:flex" aria-label="Primary">
          <PrimaryNav className="flex items-center gap-x-3.5 2xl:gap-x-5" linkClassName="whitespace-nowrap text-[14px]" />
        </nav>

        <div className="ml-auto hidden items-center gap-2 min-[1440px]:flex">
          <CatalogueSearch />
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${site.whatsapp.display}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal text-white transition-colors hover:bg-teal-deep"
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
