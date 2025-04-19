import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { NavLinkProps } from "@/lib/types";

export const NavLink = ({
  href,
  className,
  children,
  isActive,
}: NavLinkProps & { children: ReactNode }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "no-underline transition-colors",
        isActive && "font-semibold",
        className
      )}
    >
      {children}
    </Link>
  );
};
