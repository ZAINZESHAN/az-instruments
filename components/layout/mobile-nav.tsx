"use client";

import { useEffect, useState } from "react";
import { CatalogueSearch } from "@/components/layout/catalogue-search";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="ml-auto min-[1440px]:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {open ? (
        <nav
          id="site-menu"
          aria-label="Primary"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-white px-5 py-4 shadow-lg"
        >
          <CatalogueSearch variant="inline" onNavigate={() => setOpen(false)} />
          <PrimaryNav
            className="mt-3 flex flex-col border-t border-line"
            linkClassName="block border-b border-line py-3 text-[14px]"
            onNavigate={() => setOpen(false)}
          />
          <div className="mt-4 flex flex-col gap-3">
            <ButtonLink
              href={site.whatsapp.href}
              variant="whatsapp"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href="/contact" className="w-full" onClick={() => setOpen(false)}>
              Request a Quote
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
