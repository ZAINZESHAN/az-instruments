"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="ml-auto min-[1440px]:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-navy"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 bg-navy/35 transition-opacity duration-300 min-[1440px]:hidden top-14 sm:top-16 xl:top-[4.25rem]",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <div
        id="site-menu"
        className="fixed inset-x-0 z-50 overflow-hidden min-[1440px]:hidden top-14 sm:top-16 xl:top-[4.25rem]"
      >
        <nav
          aria-label="Primary"
          aria-hidden={!open}
          className={cn(
            "grid bg-white shadow-[0_24px_40px_-28px_rgba(23,43,77,0.55)] transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] border-b border-line opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-4 py-3 sm:max-h-[calc(100dvh-4rem)] sm:px-6">
              <PrimaryNav layout="stack" onNavigate={() => setOpen(false)} />
              <div className="mt-3 grid gap-2 border-t border-line pt-3">
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
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
