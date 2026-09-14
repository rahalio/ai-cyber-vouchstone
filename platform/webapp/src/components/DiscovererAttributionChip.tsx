import { cn } from "@/lib/cn";
import { DISCOVERER_LABELS, type DiscovererClass } from "@/lib/demo-data";

const tone: Record<DiscovererClass, string> = {
  security_function: "border-[color:var(--color-trust)] text-[color:var(--color-trust)]",
  other_employee: "border-[color:var(--color-brand)] text-[color:var(--color-brand)]",
  authority_or_regulator: "border-[color:var(--color-amber-lapse)] text-[color:var(--color-amber-lapse)]",
  external_researcher: "border-[color:var(--color-seal)] text-[color:var(--color-seal)]",
  supplier: "border-[color:var(--color-muted)] text-[color:var(--color-muted)]",
  customer: "border-[color:var(--color-parchment)] text-[color:var(--color-parchment)]",
  unknown: "border-[color:var(--color-seal-red)] text-[color:var(--color-seal-red)]",
};

export function DiscovererAttributionChip({ discovererClass }: { discovererClass: DiscovererClass }) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        tone[discovererClass],
      )}
    >
      {DISCOVERER_LABELS[discovererClass]}
    </span>
  );
}
