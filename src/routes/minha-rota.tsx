import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Compass } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { diagnostic, getRota, modules, rotas, type RotaId } from "@/data/academy";

export const Route = createFileRoute("/minha-rota")({
  head: () => ({
    meta: [
      { title: "Minha Rota | Marli Teixeira Academy" },
      {
        name: "description",
        content:
          "Responda ao diagnóstico inicial e receba a rota de estudo ideal: iniciante, beleza, micropigmentadora ou negócio.",
      },
      { property: "og:title", content: "Minha Rota | Marli Teixeira Academy" },
      {
        property: "og:description",
        content: "Diagnóstico inicial que define sua trilha personalizada na Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MinhaRota,
});

function MinhaRota() {
  const { state, setRota, hydrated } = useProgress();
  const [answers, setAnswers] = useState<Record<string, RotaId>>({});

  const tally = Object.values(answers);
  const suggestion: RotaId | undefined =
    tally.length === diagnostic.length
      ? (rotas
          .map((rota) => ({
            id: rota.id,
            score: tally.filter((value) => value === rota.id).length,
          }))
          .sort((a, b) => b.score - a.score)[0]?.id ?? undefined)
      : undefined;

  const current = hydrated && state.rota ? getRota(state.rota) : null;

  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-4xl space-y-12 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Compass className="size-3.5" aria-hidden="true" />
            Diagnóstico inicial
          </p>
          <h1 className="text-4xl font-semibold text-foreground">Descubra sua rota ideal</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Três perguntas rápidas. A rota define a ordem sugerida dos módulos — todo o conteúdo
            liberado continua acessível, ela só organiza o caminho.
          </p>
          {current && (
            <p className="text-sm text-gold">Rota atual: {current.name}</p>
          )}
        </header>

        <div className="space-y-8">
          {diagnostic.map((question, index) => (
            <fieldset key={question.id} className="space-y-3">
              <legend className="text-lg font-medium text-foreground">
                {index + 1}. {question.question}
              </legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.rota;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        setAnswers((previous) => ({ ...previous, [question.id]: option.rota }))
                      }
                      aria-pressed={selected}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        selected
                          ? "border-gold/60 bg-secondary text-foreground"
                          : "border-border/60 bg-card text-muted-foreground hover:border-gold/40 hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {suggestion && (
          <section className="rounded-2xl border border-gold/30 bg-card p-6 shadow-luxe">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Rota recomendada</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              {getRota(suggestion).name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{getRota(suggestion).description}</p>

            <ol className="mt-5 space-y-2">
              {getRota(suggestion).order.map((slug, index) => {
                const item = modules.find((entry) => entry.slug === slug);
                if (!item) return null;
                return (
                  <li key={slug} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[0.7rem] text-gold">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">{item.title}</span>
                    <span className="shrink-0 text-[0.7rem] text-muted-foreground">
                      {item.status === "disponivel" ? "Liberado" : "Em produção"}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => setRota(suggestion)}
                className="bg-gradient-gold text-primary-foreground hover:opacity-90"
              >
                {state.rota === suggestion ? (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    Rota salva
                  </>
                ) : (
                  "Definir como minha rota"
                )}
              </Button>
              <Button asChild variant="outline">
                <Link to="/">
                  Ir para o painel
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </AcademyShell>
  );
}
