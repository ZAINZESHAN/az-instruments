"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

type PrimaryNavProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  layout?: "row" | "stack";
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
  layout = "row",
}: PrimaryNavProps) {
  const pathname = usePathname();
  const stacked = layout === "stack";

  return (
    <ul className={cn(stacked ? "flex flex-col gap-1" : undefined, className)}>
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
                  "rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue",
                  stacked
                    ? "flex min-h-11 items-center px-3 text-[15px] font-semibold"
                    : "font-semibold",
                  current
                    ? stacked
                      ? "bg-ice text-blue"
                      : "text-blue underline decoration-blue decoration-2 underline-offset-8"
                    : stacked
                      ? "text-navy hover:bg-ice/80 hover:text-blue"
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
