import { cn } from "@/lib/utils";

/**
 * Vídeo de demonstração usado temporariamente em todas as aulas.
 * Trocar por lesson.videoId quando os vídeos reais forem enviados.
 */
export const DEMO_VIDEO_ID = "J3bhmzlcQL0";
export const DEMO_PLAYLIST_ID = "PLOByshxT9u1lAzzaLJeXKl9C9gB8QOTnK";

export interface LessonVideoProps {
  /** Título usado no atributo title do iframe (acessibilidade). */
  title: string;
  videoId?: string;
  playlistId?: string;
  className?: string;
}

export function LessonVideo({
  title,
  videoId = DEMO_VIDEO_ID,
  playlistId = DEMO_PLAYLIST_ID,
  className,
}: LessonVideoProps) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (playlistId) params.set("list", playlistId);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary shadow-card",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
