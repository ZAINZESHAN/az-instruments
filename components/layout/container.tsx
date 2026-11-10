import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  wide?: boolean;
};

export function Container({
  children,
  className,
  as: Tag = "div",
  wide = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[100rem] px-6 sm:px-8 lg:px-10",
        wide && "max-w-[100rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
