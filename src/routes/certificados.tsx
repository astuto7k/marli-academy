import { createFileRoute } from "@tanstack/react-router";
import { Award, CheckCircle2 } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";

export const Route = createFileRoute("/certificados")({
  head: () => ({ meta: [{ title: "Certificados | Marli Teixeira Academy" }] }),
  component: Certificados,
});

function Certificados() {
  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Award className="size-3.5" aria-hidden="true" />
            Conquistas
          </p>
          <h1 className="text-4xl font-semibold text-foreground">Seus certificados</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Acompanhe aqui os certificados liberados conforme você conclui as etapas da sua
            formação.
          </p>
        </header>
        <section className="rounded-3xl border border-gold/30 bg-card p-8 text-center shadow-luxe">
          <Award className="mx-auto size-10 text-gold" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold text-foreground">
            Sua primeira conquista começa agora
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Conclua os módulos da formação para liberar seus certificados e celebrar sua evolução.
          </p>
          <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-xl border border-border/60 p-4 text-left">
            <CheckCircle2 className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Nenhum certificado liberado ainda</span>
          </div>
        </section>
      </div>
    </AcademyShell>
  );
}
