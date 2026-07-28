import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { ProUnlockCard } from "@/components/academy/ProUnlockCard";
import { useProgress } from "@/hooks/use-progress";
import { passePro, proUnlocks, sistema20k } from "@/data/academy";

export const Route = createFileRoute("/desbloqueios")({
  head: () => ({
    meta: [
      { title: "Desbloqueios Pro | Marli Teixeira Academy" },
      {
        name: "description",
        content:
          "Materiais avançados opcionais: colorimetria, correções, precificação, tráfego e o sistema Operação 20K. Conteúdo essencial já incluso na formação.",
      },
      { property: "og:title", content: "Desbloqueios Pro | Marli Teixeira Academy" },
      {
        property: "og:description",
        content: "Extras opcionais que aceleram a aplicação prática de cada módulo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desbloqueios,
});

function Desbloqueios() {
  const { state, hydrated } = useProgress();

  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Crown className="size-3.5" aria-hidden="true" />
            Desbloqueios Pro
          </p>
          <h1 className="text-4xl font-semibold text-foreground">Extras opcionais</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Nada aqui é obrigatório. A formação entrega o essencial completo — estes materiais
            existem para quem quer aprofundar uma técnica específica ou implementar mais rápido.
          </p>
        </header>

        <section className="rounded-2xl border border-gold/40 bg-card p-6 shadow-luxe">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">{passePro.title}</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Todos os desbloqueios em um único acesso
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{passePro.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full border border-gold/40 px-4 py-1.5 text-gold">
              {passePro.priceWithCourse}
            </span>
            <span className="rounded-full border border-border/60 px-4 py-1.5 text-muted-foreground">
              {passePro.priceInside}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{passePro.note}</p>
        </section>

        <div className="space-y-6">
          {proUnlocks.map((unlock) => (
            <ProUnlockCard
              key={unlock.id}
              unlock={unlock}
              moduleTitle={unlock.moduleTitle}
              unlocked={hydrated && (state.passePro || state.proUnlocked.includes(unlock.id))}
            />
          ))}
        </div>

        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Programa avançado</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{sistema20k.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{sistema20k.description}</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sistema20k.items.map((item) => (
              <li key={item} className="text-sm text-foreground/85">
                · {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gold">{sistema20k.priceLabel}</p>
        </section>
      </div>
    </AcademyShell>
  );
}
