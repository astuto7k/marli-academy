import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Instagram, MessagesSquare, Radio } from "lucide-react";

import { AcademyHeader } from "@/components/academy/AcademyHeader";
import { AcademyHero } from "@/components/academy/AcademyHero";
import { CourseCard } from "@/components/academy/CourseCard";
import { StatsRow } from "@/components/academy/StatsRow";
import { Button } from "@/components/ui/button";
import { coursesWithProgress, liveSessions } from "@/data/academy";

const MEMBER_NAME = "Aluna";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marli Teixeira Academy | Área de Membros" },
      {
        name: "description",
        content:
          "Área de membros da Marli Teixeira Academy: cursos de micropigmentação, mentorias ao vivo e comunidade exclusiva para profissionais.",
      },
      { property: "og:title", content: "Marli Teixeira Academy | Área de Membros" },
      {
        property: "og:description",
        content:
          "Cursos de micropigmentação, mentorias ao vivo e comunidade exclusiva para profissionais de alto padrão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembersHome,
});

function MembersHome() {
  const inProgress =
    coursesWithProgress.find((course) => course.progress > 0 && course.progress < 100) ??
    coursesWithProgress[0];

  const hoursWatched = coursesWithProgress.reduce(
    (total, course) => total + Math.round((course.hours * course.progress) / 100),
    0,
  );
  const certificates = coursesWithProgress.filter((course) => course.progress >= 100).length;

  return (
    <div className="min-h-screen bg-background">
      <AcademyHeader memberName={MEMBER_NAME} />
      <main>
        <AcademyHero memberName={MEMBER_NAME} current={inProgress} />

        <div className="mx-auto w-full max-w-7xl space-y-20 px-4 py-16 sm:px-6">
          <section aria-label="Seu progresso">
            <StatsRow
              coursesCount={coursesWithProgress.length}
              hoursWatched={hoursWatched}
              certificates={certificates}
              streakDays={12}
            />
          </section>

          <section id="cursos" className="scroll-mt-24 space-y-8">
            <header className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Trilhas</p>
                <h2 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
                  Seus cursos
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Conteúdo gravado em alta definição, com protocolos prontos para aplicar na próxima
                cliente.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {coursesWithProgress.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>

          <section id="mentorias" className="scroll-mt-24 space-y-8">
            <header>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Ao vivo</p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
                Mentorias e plantões
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    {session.status === "Ao vivo" ? (
                      <Radio className="size-5" aria-hidden="true" />
                    ) : (
                      <CalendarClock className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-foreground">
                      {session.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.date} · {session.time}
                    </p>
                  </div>
                  <Button
                    variant={session.status === "Ao vivo" ? "default" : "outline"}
                    className="ml-auto shrink-0"
                  >
                    {session.status === "Ao vivo" ? "Entrar" : "Lembrar"}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section
            id="comunidade"
            className="scroll-mt-24 overflow-hidden rounded-3xl border border-gold/30 bg-card p-8 shadow-luxe sm:p-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl space-y-3">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Comunidade</p>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                  Você não estuda sozinha
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Grupo exclusivo de alunas para trocar casos reais, receber correção de trabalhos e
                  acompanhar bastidores do estúdio.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90">
                  <MessagesSquare className="size-4" aria-hidden="true" />
                  Entrar no grupo
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.instagram.com/marlitteixeiramicro/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="size-4" aria-hidden="true" />
                    @marlitteixeiramicro
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Marli Teixeira Academy · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
