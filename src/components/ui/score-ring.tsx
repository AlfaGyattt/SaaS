import { cn } from "@/lib/utils";

type ScoreRingProps = {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
};

/** Anneau de score ATS — composant métier présentationnel. */
export function ScoreRing({
  value,
  size = 96,
  stroke = 8,
  label = "ATS",
  className,
}: ScoreRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = c - (clamped / 100) * c;
  const tone =
    clamped >= 80 ? "var(--success)" : clamped >= 60 ? "var(--warning)" : "var(--danger)";

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Score ${label} : ${clamped} sur 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms var(--ease-emphasized)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-xl font-semibold tabular-nums">{clamped}</span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
