import Link from "next/link";
import { Container } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { navItems, site } from "@/lib/site";

const footerLinks = navItems.filter((item) => item.href !== "/downloads");

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-2xl font-bold tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-ice uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/78 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-ice uppercase">
            Contact
          </h2>
          <address className="mt-4 text-sm leading-7 text-white/78 not-italic">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.email.href} className="text-sm text-white/78 hover:text-white">
                {site.email.display}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="text-sm text-white/78 hover:text-white">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>AZ Instruments · Sialkot, Pakistan</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
