import { cn } from "@/lib/cn";

export function BrandMark({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <p className={cn("font-display tracking-[0.14em] text-[color:var(--color-brand)]", className)}>
      <span className={wordmarkClassName}>Vouchstone</span>
    </p>
  );
}
