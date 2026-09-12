import { SparkIcon } from "@/components/ui/icons";
import type { LoreCap } from "@/types";

interface LoreCapPanelProps {
  loreCap?: LoreCap | null;
}

export function LoreCapPanel({ loreCap }: LoreCapPanelProps) {
  if (!loreCap) {
    return (
      <button
        type="button"
        className="border-cinema-accent/40 text-cinema-accent hover:bg-cinema-accent-soft flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-2.5 text-sm font-medium transition-colors"
      >
        <SparkIcon className="size-4" />
        Recordarme qué pasó antes
      </button>
    );
  }

  return (
    <div className="bg-cinema-accent-soft/50 border-cinema-accent/25 rounded-xl border p-3">
      <div className="mb-2 flex items-center gap-2">
        <SparkIcon className="text-cinema-accent size-4" />
        <p className="text-cinema-accent text-xs font-semibold uppercase tracking-wide">
          LoreCap · sin spoilers
        </p>
      </div>
      <ul className="space-y-2">
        {loreCap.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm leading-snug">
            <span className="bg-cinema-accent mt-1.5 size-1.5 shrink-0 rounded-full" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
