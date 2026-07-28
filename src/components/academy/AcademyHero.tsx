import { Link } from "@tanstack/react-router";
import { Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { heroCover, type CourseWithProgress } from "@/data/academy";

export interface AcademyHeroProps {
  readonly memberName: string;
  readonly current: CourseWithProgress;
}

export function AcademyHero({ memberName, current }: AcademyHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroCover}
        alt="Profissional realizando micropigmentação de sobrancelhas em estúdio"
        width={1600}
        height={912}
        className="absolute inset-0 size-full object-cover object-center opacity-60"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-veil)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/50 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-gold backdrop-blur">
          <Sparkles className="size-3" aria-hidden="true" />
          Área de membros
        </span>

        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl md:text-6xl">
          Bem-vinda de volta, <span className="text-gradient-gold">{memberName}</span>.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Seu estúdio de aprendizado em micropigmentação: técnica de alto padrão, mentorias ao vivo
          e o método que transforma traço em autoridade.
        </p>

        <div className="mt-10 max-w-md rounded-2xl border border-border/60 bg-card/80 p-5 shadow-luxe backdrop-blur-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">Continue de onde parou</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{current.title}</h2>
          <Progress value={current.progress} className="mt-4 h-1.5 bg-secondary" />
          <p className="mt-2 text-xs text-muted-foreground">
            {current.completedLessons} de {current.totalLessons} aulas concluídas
          </p>
          <Button asChild className="mt-5 w-full bg-gradient-gold text-primary-foreground hover:opacity-90">
            <Link to="/curso/$slug" params={{ slug: current.slug }}>
              <Play className="size-4" aria-hidden="true" />
              Retomar aula
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
