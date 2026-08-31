import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Flame, PlayCircle } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ao-vivo")({
  head: () => ({ meta: [{ title: "Desafios da semana | Marli Teixeira Academy" }] }),
  component: Desafios,
});

function Desafios() {
  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Flame className="size-3.5" aria-hidden="true" />
            Prática guiada
          </p>
          <h1 className="text-4xl font-semibold text-foreground">Desafios da semana</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Conteúdo rápido e tarefas práticas para transformar cada aula em evolução visível.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-gold/30 bg-card p-6 shadow-card sm:col-span-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <CalendarDays className="size-4" aria-hidden="true" />
              Desafio atual
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
              Sua próxima pequena vitória
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Escolha uma técnica da trilha atual, pratique por 20 minutos e registre o que você
              aprendeu. Constância vence a pressa.
            </p>
            <Button className="mt-6 bg-gradient-gold text-primary-foreground hover:opacity-90">
              Começar desafio <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </article>
          <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <PlayCircle className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-semibold text-foreground">Replays e encontros</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Os próximos conteúdos gravados aparecerão aqui para você assistir no seu ritmo.
            </p>
          </article>
          <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <Flame className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-semibold text-foreground">Sequência de prática</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Volte todos os dias e acumule pontos mantendo sua jornada ativa.
            </p>
          </article>
        </div>
      </div>
    </AcademyShell>
  );
}
