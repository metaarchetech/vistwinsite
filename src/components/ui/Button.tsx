import { ReactNode } from "react";

type Variant = "primary" | "ghost" | "underline";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const variants: Record<Variant, string> = {
    primary:
      "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm bg-zinc-900 text-white hover:bg-signal-600 transition-colors duration-200",
    ghost:
      "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm border border-zinc-300 text-zinc-900 hover:border-zinc-900 transition-colors duration-200",
    underline:
      "group inline-flex items-center gap-2 text-sm text-zinc-900 border-b border-zinc-900 pb-1 hover:border-signal-600 hover:text-signal-600 transition-colors",
  };

  const classes = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
