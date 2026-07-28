import { Award, Flame, GraduationCap, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  readonly label: string;
  readonly value: string;
  readonly hint: string;
  readonly icon: LucideIcon;
}

export interface StatsRowProps {
  readonly coursesCount: number;
  readonly hoursWatched: number;
  readonly certificates: number;
  readonly streakDays: number;
}

export function StatsRow({
  coursesCount,
  hoursWatched,
  certificates,
  streakDays,
}: StatsRowProps) {
  const stats: readonly Stat[] = [
    {
      label: "Cursos liberados",
      value: String(coursesCount),
      hint: "acesso vitalício",
      icon: GraduationCap,
    },
    { label: "Horas de estudo", value: `${hoursWatched}h`, hint: "neste ciclo", icon: Timer },
    { label: "Certificados", value: String(certificates), hint: "emitidos", icon: Award },
    { label: "Ofensiva", value: `${streakDays} dias`, hint: "sem faltar", icon: Flame },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-colors hover:border-gold/40"
        >
          <stat.icon className="size-5 text-gold" aria-hidden="true" />
          <p className="mt-4 text-3xl font-semibold text-foreground">{stat.value}</p>
          <p className="text-sm text-foreground/80">{stat.label}</p>
          <p className="text-xs text-muted-foreground">{stat.hint}</p>
        </div>
      ))}
    </div>
  );
}
