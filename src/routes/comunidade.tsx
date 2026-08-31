import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, MessageCircle, Users } from "lucide-react";

import { AcademyShell } from "@/components/academy/AcademyShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/comunidade")({
  head: () => ({ meta: [{ title: "Grupo no WhatsApp | Marli Teixeira Academy" }] }),
  component: Comunidade,
});

function Comunidade() {
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_COMMUNITY_URL;

  return (
    <AcademyShell>
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Users className="size-3.5" aria-hidden="true" />
            Comunidade
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            Você não precisa caminhar sozinha
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Troque experiências, compartilhe sua evolução e receba avisos importantes diretamente no
            grupo oficial da Academy.
          </p>
        </header>

        <section className="rounded-3xl border border-gold/30 bg-card p-6 shadow-luxe sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-foreground">
            Grupo exclusivo no WhatsApp
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Um espaço para pedir ajuda, celebrar pequenas vitórias e acompanhar as novidades da sua
            jornada.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-2">
            {[
              "Trocas com outras alunas",
              "Avisos e novidades da Academy",
              "Dúvidas do dia a dia",
              "Incentivo para manter o ritmo",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="mt-7 bg-[#25D366] text-white hover:bg-[#20bd5b]"
            disabled={!whatsappUrl}
          >
            <a href={whatsappUrl || undefined} target="_blank" rel="noreferrer noopener">
              {whatsappUrl
                ? "Entrar no grupo do WhatsApp"
                : "Convite será disponibilizado em breve"}
              {whatsappUrl && <ArrowUpRight className="size-4" aria-hidden="true" />}
            </a>
          </Button>
        </section>
      </div>
    </AcademyShell>
  );
}
