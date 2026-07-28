import { Link } from "@tanstack/react-router";
import { Clock, PlayCircle } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { CourseWithProgress } from "@/data/academy";

export interface CourseCardProps extends ComponentProps<"article"> {
  readonly course: CourseWithProgress;
}

export function CourseCard({ course, className, ...props }: CourseCardProps) {
  const finished = course.progress >= 100;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-luxe",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={course.cover}
          alt={`Capa do curso ${course.title}`}
          loading="lazy"
          width={1024}
          height={640}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          {course.level}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-[0.7rem] text-muted-foreground backdrop-blur">
          <Clock className="size-3" aria-hidden="true" />
          {course.hours}h
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.tagline}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {course.completedLessons}/{course.totalLessons} aulas
            </span>
            <span className={cn(finished ? "text-gold" : "text-foreground")}>
              {finished ? "Concluído" : `${course.progress}%`}
            </span>
          </div>
          <Progress value={course.progress} className="h-1.5 bg-secondary" />
        </div>

        <Link
          to="/curso/$slug"
          params={{ slug: course.slug }}
          className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PlayCircle className="size-4" aria-hidden="true" />
          {course.progress > 0 && !finished ? "Continuar" : "Acessar curso"}
          <span className="sr-only"> — {course.title}</span>
        </Link>
      </div>
    </article>
  );
}
