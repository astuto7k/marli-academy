import { useState } from "react";
import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  Download,
  Flag,
  PlayCircle,
} from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { LessonVideo } from "@/components/academy/LessonVideo";
import { ProUnlockCard } from "@/components/academy/ProUnlockCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { getModule, modules, type AcademyModule } from "@/data/academy";

export const Route = createFileRoute("/modulo/$slug")({
  loader: ({ params }) => {
    const found = getModule(params.slug);
    if (!found) throw notFound();
    return { slug: found.slug };
  },
  head: ({ loaderData }) => {
    const found = loaderData ? getModule(loaderData.slug) : undefined;
    const title = found
      ? `${found.title} | Marli Teixeira Academy`
      : "Módulo | Marli Teixeira Academy";
    const description =
      found?.summary ?? "Módulo da formação em micropigmentação da Marli Teixeira Academy.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useLoaderData() as { slug: string };
  const academyModule = getModule(slug) as AcademyModule;
  const { hydrated, state, progressOf, toggleLesson, completeLesson, toggleChallenge } =
    useProgress();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLesson = academyModule.lessons[activeIndex] ?? academyModule.lessons[0];
  const activeDone = state.lessons.includes(`${academyModule.slug}::${activeIndex}`);
  const hasNextLesson = activeIndex < academyModule.lessons.length - 1;

  const progress = progressOf(academyModule.slug);
  const inProduction = academyModule.status === "producao";
  const challengeDone = state.challenges.includes(academyModule.slug);
  const proUnlocked = state.passePro || state.proUnlocked.includes(academyModule.pro?.id ?? "");

  // Próximo módulo segue a ordem global da formação (não só o mesmo núcleo).
  const nextModule = modules[modules.findIndex((item) => item.slug === academyModule.slug) + 1];
  const moduleCompleted = hydrated && progress.completed;

  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar para o início
        </Link>

        <header className="mt-6 space-y-6">
          <div className="space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              Módulo {academyModule.number}
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {academyModule.title}
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">{academyModule.summary}</p>

            {inProduction && (
              <p className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1.5 text-xs text-muted-foreground">
                <Clock3 className="size-3.5" aria-hidden="true" />
                Gravação em produção — entra depois das primeiras alunas
              </p>
            )}
          </div>

          <div className="space-y-3">
            <LessonVideo title={`${academyModule.title} — ${activeLesson ?? "aula"}`} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <PlayCircle className="size-3.5 text-gold" aria-hidden="true" />
                Aula {activeIndex + 1} de {academyModule.lessons.length} ·{" "}
                {activeLesson ?? academyModule.title}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant={activeDone ? "outline" : "default"}
                  disabled={inProduction}
                  onClick={() => toggleLesson(academyModule.slug, activeIndex)}
                  className={cn(
                    "gap-2",
                    !activeDone && "bg-gradient-gold text-primary-foreground hover:opacity-90",
                  )}
                >
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {activeDone ? "Aula concluída (+10 pts)" : "Marcar como concluída"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={inProduction || !hasNextLesson || !activeDone}
                  title={
                    !activeDone ? "Marque a aula como concluída para avançar" : "Ir para a próxima aula"
                  }
                  onClick={() => {
                    completeLesson(academyModule.slug, activeIndex);
                    setActiveIndex((current) =>
                      Math.min(current + 1, academyModule.lessons.length - 1),
                    );
                  }}
                  className="gap-2"
                >
                  Próxima aula
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>

                {nextModule && (
                  <Button
                    type="button"
                    disabled={!moduleCompleted}
                    title={
                      moduleCompleted
                        ? `Ir para: ${nextModule.title}`
                        : "Conclua todas as aulas para liberar o próximo módulo"
                    }
                    onClick={() =>
                      navigate({ to: "/modulo/$slug", params: { slug: nextModule.slug } })
                    }
                    className={cn(
                      "gap-2",
                      moduleCompleted && "bg-gradient-gold text-primary-foreground hover:opacity-90",
                    )}
                  >
                    Próximo módulo
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
            {!activeDone && hasNextLesson && (
              <p className="text-[0.7rem] text-muted-foreground">
                Marque esta aula como concluída para liberar a próxima.
              </p>
            )}
            {!hasNextLesson && !moduleCompleted && nextModule && (
              <p className="text-[0.7rem] text-muted-foreground">
                Conclua todas as aulas do módulo para liberar o próximo módulo.
              </p>
            )}
          </div>
        </header>


        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Aulas */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Aulas do módulo</h2>
              <span className="text-sm text-gold">{hydrated ? progress.percent : 0}%</span>
            </div>
            <Progress value={hydrated ? progress.percent : 0} className="h-1.5 bg-secondary" />

            <ul className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
              {academyModule.lessons.map((lesson, index) => {
                const done = state.lessons.includes(`${academyModule.slug}::${index}`);
                return (
                  <li
                    key={lesson}
                    className={cn(
                      "flex items-center gap-3 border-b border-border/60 px-2 last:border-b-0",
                      index === activeIndex && "bg-secondary/60",
                    )}
                  >
                    <button
                      type="button"
                      disabled={inProduction}
                      onClick={() => toggleLesson(academyModule.slug, index)}
                      aria-pressed={done}
                      aria-label={done ? `Desmarcar ${lesson}` : `Marcar ${lesson} como concluída`}
                      className="shrink-0 rounded-full p-2 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {done ? (
                        <CheckCircle2 className="size-4 text-gold" aria-hidden="true" />
                      ) : (
                        <Circle className="size-4 text-muted-foreground" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={inProduction}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "flex min-w-0 flex-1 items-center gap-3 py-3 pr-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                        inProduction && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <span className="text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 text-sm",
                          done ? "text-muted-foreground line-through" : "text-foreground",
                        )}
                      >
                        {lesson}
                      </span>
                      <span className="shrink-0 text-[0.7rem] text-muted-foreground">+10 pts</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {academyModule.challenge && (
              <div className="rounded-2xl border border-gold/30 bg-card p-5 shadow-card">
                <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                  <Flag className="size-3.5" aria-hidden="true" />
                  Desafio do módulo
                </p>
                <p className="mt-2 text-sm text-foreground">{academyModule.challenge}</p>
                <Button
                  variant={challengeDone ? "outline" : "default"}
                  disabled={inProduction}
                  onClick={() => toggleChallenge(academyModule.slug)}
                  className={cn(
                    "mt-4",
                    !challengeDone && "bg-gradient-gold text-primary-foreground hover:opacity-90",
                  )}
                >
                  {challengeDone ? "Desafio concluído (+40 pts)" : "Marcar desafio como concluído"}
                </Button>
              </div>
            )}
          </section>

          {/* Entregáveis */}
          <aside className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Entregáveis</h2>
            <ul className="space-y-2">
              {academyModule.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 shadow-card"
                >
                  <Download className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="min-w-0 flex-1 text-sm text-foreground">{item}</span>
                  <span className="shrink-0 text-[0.7rem] text-muted-foreground">
                    {inProduction ? "Em breve" : "PDF"}
                  </span>
                </li>
              ))}
            </ul>

            {nextModule && (
              <Button
                type="button"
                variant="outline"
                disabled={!moduleCompleted}
                title={
                  moduleCompleted
                    ? `Ir para: ${nextModule.title}`
                    : "Conclua todas as aulas para liberar o próximo módulo"
                }
                onClick={() => navigate({ to: "/modulo/$slug", params: { slug: nextModule.slug } })}
                className="w-full"
              >
                Próximo: {nextModule.title}
              </Button>
            )}
          </aside>
        </div>

        {academyModule.pro && (
          <ProUnlockCard
            className="mt-12"
            unlock={academyModule.pro}
            unlocked={proUnlocked}
          />
        )}
      </div>
    </AcademyShell>
  );
}
