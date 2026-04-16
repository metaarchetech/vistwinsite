import { ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
  id,
  bg = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "zinc" | "ink";
}) {
  const bgClass =
    bg === "ink"
      ? "bg-zinc-900 text-zinc-100"
      : bg === "zinc"
      ? "bg-zinc-50"
      : "bg-white";

  return (
    <section id={id} className={`relative py-24 lg:py-32 ${bgClass} ${className}`}>
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {children}
      </div>
    </section>
  );
}
