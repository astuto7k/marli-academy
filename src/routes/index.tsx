import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { GamificationPanel } from "@/components/academy/GamificationPanel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import { getRota, heroCover, modules, nucleos } from "@/data/academy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marli Teixeira Academy | Área de Membros Gamificada" },
      {
        name: "description",
        content:
          "Formação completa em micropigmentação: base técnica, trilhas, construção do negócio, gamificação com níveis e medalhas, e Desbloqueios Pro opcionais.",
      },
      { property: "og:title", content: "Marli Teixeira Academy | Área de Membros Gamificada" },
      {
        property: "og:description",
        content:
          "Formação completa em micropigmentação: base técnica, trilhas, construção do negócio, gamificação com níveis e medalhas, e Desbloqueios Pro opcionais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { hydrated, state, points, level, nextLevel, earnedMedals, progressOf, lessonsCompleted } =
    useProgress();

  const rota = state.rota ? getRota(state.rota) : null;
  const available = modules.filter((item) => item.status === "disponivel");
  const nextModule =
    (rota
      ? rota.order
          .map((slug) => modules.find((item) => item.slug === slug))
          .find((item) => item && item.status === "disponivel" && progressOf(item.slug).percent < 100)
      : undefined) ??
    available.find((item) => progressOf(item.slug).percent < 100) ??
    available[0];

  const nextProgress = progressOf(nextModule.slug);
  const totalLessons = available.reduce((sum, item) => sum + item.lessons.length, 0);
  const globalPercent = totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0;

  return (
    <AcademyShell>
      {/* Hero de boas-vindas */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroCover}
          alt="Profissional realizando micropigmentação em estúdio"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/50 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-gold backdrop-blur">
            <Sparkles className="size-3" aria-hidden="true" />
            {rota ? rota.name : "Comece pelo diagnóstico"}
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl">
            Bem-vinda à <span className="text-gradient-gold">Marli Teixeira Academy</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Aprenda diferentes áreas da micropigmentação, construa sua imagem profissional e
            desenvolva uma operação preparada para conquistar clientes e crescer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {!rota && (
              <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90">
                <Link to="/minha-rota">
                  Fazer diagnóstico inicial
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            )}
            <Button asChild variant={rota ? "default" : "outline"} className={rota ? "bg-gradient-gold text-primary-foreground hover:opacity-90" : ""}>
              <Link to="/modulo/$slug" params={{ slug: nextModule.slug }}>
                <PlayCircle className="size-4" aria-hidden="true" />
                {nextProgress.percent > 0 ? "Continuar" : "Começar"}: {nextModule.title}
              </Link>
            </Button>
          </div>

          <div className="mt-10 max-w-md rounded-2xl border border-border/60 bg-card/80 p-5 shadow-luxe backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progresso da formação liberada</span>
              <span className="text-gold">{hydrated ? globalPercent : 0}%</span>
            </div>
            <Progress value={hydrated ? globalPercent : 0} className="mt-3 h-1.5 bg-secondary" />
            <p className="mt-2 text-xs text-muted-foreground">
              {hydrated ? lessonsCompleted : 0} de {totalLessons} aulas concluídas · {hydrated ? points : 0} pontos
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {/* Gamificação */}
        <section aria-label="Gamificação" className="space-y-6">
          <header>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Gamificação</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Seu progresso</h2>
          </header>
          <GamificationPanel
            points={hydrated ? points : 0}
            level={level}
            nextLevel={nextLevel}
            earnedMedalIds={earnedMedals.map((medal) => medal.id)}
          />
        </section>

        {/* Núcleos: um card por núcleo (os módulos ficam dentro do núcleo) */}
        <section aria-label="Núcleos da formação" className="space-y-6">
          <header className="max-w-2xl">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Formação</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Núcleos</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tudo liberado: entre no núcleo e siga módulo a módulo na ordem sugerida.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nucleos.map((nucleo) => {
              const items = modules.filter((item) => item.nucleo === nucleo.id);
              if (items.length === 0) return null;

              const totals = items.reduce(
                (acc, item) => {
                  const progress = progressOf(item.slug);
                  return { done: acc.done + progress.done, total: acc.total + progress.total };
                },
                { done: 0, total: 0 },
              );
              const percent =
                totals.total > 0 ? Math.round((totals.done / totals.total) * 100) : 0;

              return (
                <Link
                  key={nucleo.id}
                  to="/nucleo/$id"
                  params={{ id: nucleo.id }}
                  className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-luxe"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                    {items.length} {items.length === 1 ? "módulo" : "módulos"}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">{nucleo.label}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{nucleo.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {hydrated ? totals.done : 0} de {totals.total} aulas
                      </span>
                      <span className="text-gold">{hydrated ? percent : 0}%</span>
                    </div>
                    <Progress value={hydrated ? percent : 0} className="h-1.5 bg-secondary" />
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold">
                    Acessar núcleo
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </AcademyShell>
  );
}
