import { Award, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { MEDALS_DISCLAIMER, medals, type Level } from "@/data/academy";

export interface GamificationPanelProps {
  readonly points: number;
  readonly level: Level;
  readonly nextLevel?: Level;
  readonly earnedMedalIds: readonly string[];
}

export function GamificationPanel({
  points,
  level,
  nextLevel,
  earnedMedalIds,
}: GamificationPanelProps) {
  const span = nextLevel ? nextLevel.minPoints - level.minPoints : 1;
  const gained = points - level.minPoints;
  const percent = nextLevel ? Math.min(100, Math.round((gained / span) * 100)) : 100;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="rounded-2xl border border-gold/30 bg-card p-6 shadow-card">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Seu nível</p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground">
          Nível {level.level} · {level.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{level.criteria}</p>

        <Progress value={percent} className="mt-5 h-1.5 bg-secondary" />
        <p className="mt-2 text-xs text-muted-foreground">
          {nextLevel
            ? `${points} pontos · faltam ${nextLevel.minPoints - points} pontos para "${nextLevel.name}"`
            : `${points} pontos · nível máximo alcançado`}
        </p>

        <ul className="mt-5 space-y-1 text-xs text-muted-foreground">
          <li>+10 pontos por aula concluída</li>
          <li>+60 pontos por módulo finalizado</li>
          <li>+40 pontos por desafio cumprido</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Medalhas</p>
          <span className="text-xs text-muted-foreground">
            {earnedMedalIds.length}/{medals.length}
          </span>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {medals.map((medal) => {
            const earned = earnedMedalIds.includes(medal.id);
            return (
              <li
                key={medal.id}
                className={cn(
                  "rounded-xl border p-3 text-center",
                  earned ? "border-gold/50 bg-secondary" : "border-border/60 opacity-60",
                )}
                title={medal.hint}
              >
                {earned ? (
                  <Award className="mx-auto size-5 text-gold" aria-hidden="true" />
                ) : (
                  <Lock className="mx-auto size-5 text-muted-foreground" aria-hidden="true" />
                )}
                <p className="mt-2 text-xs leading-tight text-foreground">{medal.name}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-[0.7rem] text-muted-foreground">{MEDALS_DISCLAIMER}</p>
      </div>
    </div>
  );
}
