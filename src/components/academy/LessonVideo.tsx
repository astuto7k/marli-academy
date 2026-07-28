import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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

function buildSrc(videoId: string, playlistId?: string) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (playlistId) params.set("list", playlistId);
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function LessonVideo({
  title,
  videoId = DEMO_VIDEO_ID,
  playlistId = DEMO_PLAYLIST_ID,
  className,
}: LessonVideoProps) {
  const [expanded, setExpanded] = useState(false);
  const src = buildSrc(videoId, playlistId);

  return (
    <>
      <div
        className={cn(
          "group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary shadow-card",
          className,
        )}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setExpanded(true)}
          aria-label="Ampliar vídeo"
          className="absolute right-3 top-3 z-10 gap-2 bg-background/80 text-foreground backdrop-blur transition-opacity hover:bg-background"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Ampliar</span>
        </Button>
      </div>

      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[96vw] border-border/60 bg-background p-3 sm:max-w-[92vw] lg:max-w-6xl"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary">
            {expanded && (
              <iframe
                src={src}
                title={`${title} (ampliado)`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-3 px-1">
            <p className="min-w-0 truncate text-sm text-muted-foreground">{title}</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setExpanded(false)}
              className="shrink-0 gap-2"
            >
              <Minimize2 className="size-4" aria-hidden="true" />
              Reduzir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
