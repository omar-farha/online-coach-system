import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-2 shadow-[0_0_0_1px_rgba(255,90,31,0.4)] hover:shadow-[0_0_24px_rgba(255,90,31,0.45)]",
  secondary: "bg-surface-2 text-foreground hover:bg-surface-2/70 border border-border",
  outline: "border border-border text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:bg-surface",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  target?: string;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  target,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}
