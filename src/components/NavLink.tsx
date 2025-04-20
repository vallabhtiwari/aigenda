import Link from "next/link";
import type { ReactNode } from "react";
import { NavLinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const NavLink = ({
  href,
  className,
  children,
  isActive,
}: NavLinkProps & { children: ReactNode }) => {
  return (
    <Link
      href={href}
      className={cn(
        "no-underline transition-colors",
        isActive && "font-semibold",
        className
      )}
    >
      {children}
    </Link>
  );
};
