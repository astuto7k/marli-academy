import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Lock, Play } from "lucide-react";
import { useState } from "react";

import { AcademyHeader } from "@/components/academy/AcademyHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getCourse, type Lesson } from "@/data/academy";

export const Route = createFileRoute("/curso/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.course.title} | Marli Teixeira Academy`
      : "Curso | Marli Teixeira Academy";
    const description =
      loaderData?.course.description ??
      "Curso de micropigmentação da Marli Teixeira Academy.";
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
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const firstPending =
    course.modules.flatMap((module) => module.lessons).find((lesson) => !lesson.completed) ??
    course.modules[0].lessons[0];
  const [activeLesson, setActiveLesson] = useState<Lesson>(firstPending);

  return (
    <div className="min-h-screen bg-background">
      <AcademyHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar para a área de membros
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 shadow-card">
              <img
                src={course.cover}
                alt={`Aula ${activeLesson.title}`}
                loading="lazy"
                width={1024}
                height={640}
                className="size-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                <button
                  type="button"
                  aria-label={`Reproduzir aula ${activeLesson.title}`}
                  className="flex size-20 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-luxe transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Play className="size-8" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                {course.level} · {course.hours}h de conteúdo
              </p>
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
                {activeLesson.title}
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">{course.description}</p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Progresso do curso</span>
                <span className="text-gold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="mt-3 h-1.5 bg-secondary" />
              <Button className="mt-5 bg-gradient-gold text-primary-foreground hover:opacity-90">
                Marcar aula como concluída
              </Button>
            </div>
          </div>

          <aside className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground">Conteúdo do curso</h2>
            {course.modules.map((module, index) => (
              <div
                key={module.id}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card"
              >
                <div className="border-b border-border/60 px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                    Módulo {index + 1}
                  </p>
                  <p className="text-sm font-medium text-foreground">{module.title}</p>
                </div>
                <ul>
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id && module.lessons.includes(lesson);
                    return (
                      <li key={`${module.id}-${lesson.id}`}>
                        <button
                          type="button"
                          onClick={() => setActiveLesson(lesson)}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                            isActive && "bg-secondary",
                          )}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="size-4 shrink-0 text-gold" aria-hidden="true" />
                          ) : (
                            <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                          )}
                          <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                            {lesson.title}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
