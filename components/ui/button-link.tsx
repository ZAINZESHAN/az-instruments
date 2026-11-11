import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "whatsapp";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "bg-blue text-white shadow-sm shadow-blue/25 hover:bg-blue-deep",
  outline: "border border-line bg-white text-navy hover:border-blue hover:text-blue",
  whatsapp: "bg-teal text-white hover:bg-teal-deep",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-semibold transition-colors sm:h-11 sm:px-5 sm:text-sm",
    variants[variant],
    className,
  );
  const internal = href.startsWith("/") || href.startsWith("#");

  if (!internal) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
