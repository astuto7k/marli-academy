import { createFileRoute } from "@tanstack/react-router";
import { Gift, ShoppingBag, Sparkles } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";

export const Route = createFileRoute("/loja")({
  head: () => ({ meta: [{ title: "Loja da aluna | Marli Teixeira Academy" }] }),
  component: Loja,
});

function Loja() {
  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <ShoppingBag className="size-3.5" aria-hidden="true" />
            Loja da aluna
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            Materiais para sua próxima fase
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Em breve, você encontrará materiais selecionados e experiências especiais para continuar
            evoluindo.
          </p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-gold/30 bg-card p-6 shadow-card">
            <Gift className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-semibold text-foreground">Kits e materiais</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Produtos pensados para apoiar sua rotina de estudos e prática.
            </p>
          </article>
          <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <Sparkles className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-semibold text-foreground">Benefícios especiais</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Novidades e condições exclusivas para alunas da Academy.
            </p>
          </article>
        </section>
      </div>
    </AcademyShell>
  );
}
