import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Crown, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { AcademyModule } from "@/data/academy";

export interface ModuleCardProps {
  readonly module: AcademyModule;
  readonly percent: number;
  readonly className?: string;
}

export function ModuleCard({ module, percent, className }: ModuleCardProps) {
  const inProduction = module.status === "producao";
  const done = percent >= 100;

  const content = (
    <>
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={module.cover}
          alt={`Capa do módulo ${module.title}`}
          loading="lazy"
          width={1024}
          height={640}
          className={cn(
            "size-full object-cover transition-transform duration-700 group-hover:scale-105",
            inProduction && "grayscale",
          )}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          Módulo {module.number}
        </span>
        {inProduction && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-[0.65rem] text-muted-foreground backdrop-blur">
            <Clock3 className="size-3" aria-hidden="true" />
            Em produção
          </span>
        )}
        {done && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-[0.65rem] text-gold backdrop-blur">
            <CheckCircle2 className="size-3" aria-hidden="true" />
            Concluído
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
          <p className="text-sm text-muted-foreground">{module.summary}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{module.lessons.length} aulas · {module.deliverables.length} entregáveis</span>
            <span className={cn(done ? "text-gold" : "text-foreground")}>{percent}%</span>
          </div>
          <Progress value={percent} className="h-1.5 bg-secondary" />
        </div>

        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              inProduction ? "text-muted-foreground" : "text-gold",
            )}
          >
            <PlayCircle className="size-4" aria-hidden="true" />
            {inProduction ? "Em breve" : percent > 0 ? "Continuar" : "Começar módulo"}
          </span>
          {module.pro && (
            <span className="inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground">
              <Crown className="size-3 text-gold" aria-hidden="true" />
              Pro
            </span>
          )}
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    "group relative block overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-card transition-all duration-300",
    inProduction ? "opacity-70" : "hover:-translate-y-1 hover:border-gold/50 hover:shadow-luxe",
    className,
  );

  if (inProduction) {
    return <article className={baseClass}>{content}</article>;
  }

  return (
    <Link to="/modulo/$slug" params={{ slug: module.slug }} className={baseClass}>
      {content}
    </Link>
  );
}
