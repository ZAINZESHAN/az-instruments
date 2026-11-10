"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

type PrimaryNavProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

function isCurrent(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.startsWith("/#")) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav({
  className,
  linkClassName,
  onNavigate,
}: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navItems
        .filter((item) => item.href !== "/downloads")
        .map((item) => {
        const current = isCurrent(item.href, pathname);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={cn(
                "rounded-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue",
                current
                  ? "text-blue underline decoration-blue decoration-2 underline-offset-8"
                  : "text-navy/80 hover:text-blue",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
