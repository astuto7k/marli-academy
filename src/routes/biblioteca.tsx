import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { modules } from "@/data/academy";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Materiais | Marli Teixeira Academy" },
      {
        name: "description",
        content:
          "Todos os entregáveis da formação em um só lugar: checklists, planilhas, scripts, contratos e guias práticos de micropigmentação.",
      },
      { property: "og:title", content: "Biblioteca de Materiais | Marli Teixeira Academy" },
      {
        property: "og:description",
        content: "Checklists, planilhas, scripts e guias práticos prontos para aplicar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <FileText className="size-3.5" aria-hidden="true" />
            Biblioteca
          </p>
          <h1 className="text-4xl font-semibold text-foreground">Materiais da formação</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Cada módulo entrega materiais prontos para usar no dia a dia do estúdio.
          </p>
        </header>

        <div className="space-y-8">
          {modules.map((item) => (
            <section key={item.slug} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Módulo {item.number} · {item.title}
              </h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {item.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 shadow-card"
                  >
                    <Download className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="min-w-0 flex-1 text-sm text-foreground">{deliverable}</span>
                    <span className="shrink-0 text-[0.7rem] text-muted-foreground">
                      {item.status === "disponivel" ? "Disponível" : "Em produção"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </AcademyShell>
  );
}
