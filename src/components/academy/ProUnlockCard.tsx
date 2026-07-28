import { Check, Crown, Lock } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ProUnlock } from "@/data/academy";

export interface ProUnlockCardProps {
  readonly unlock: ProUnlock;
  readonly moduleTitle?: string;
  readonly unlocked: boolean;
  readonly className?: string;
}

/**
 * Desbloqueio Pro (upsell).
 *
 * Princípio do produto: o conteúdo essencial já está liberado no módulo — o
 * Pro apenas acelera, aprofunda ou implementa. Por isso o card sempre reforça
 * essa mensagem antes do preço.
 */
export function ProUnlockCard({
  unlock,
  moduleTitle,
  unlocked,
  className,
}: ProUnlockCardProps) {
  const handleUnlock = () => {
    toast("Checkout em breve", {
      description: `${unlock.title} — ${unlock.priceLabel}. A integração de pagamento entra na próxima etapa.`,
    });
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gold/30 bg-card p-6 shadow-card",
        className,
      )}
      aria-label={`Desbloqueio Pro: ${unlock.title}`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: "var(--gradient-gold)" }}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            <Crown className="size-3.5" aria-hidden="true" />
            Desbloqueio Pro {moduleTitle ? `· ${moduleTitle}` : ""}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{unlock.title}</h3>
        </div>
        <span className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold">
          {unlock.priceLabel}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Opcional. Todo o conteúdo essencial deste módulo já está liberado — o Pro serve para
        aprofundar e implementar mais rápido.
      </p>

      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {unlock.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
            {unlocked ? (
              <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            ) : (
              <Lock className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span className={cn(!unlocked && "text-muted-foreground")}>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {unlocked ? (
          <Button variant="outline" disabled>
            <Check className="size-4" aria-hidden="true" />
            Liberado no seu acesso
          </Button>
        ) : (
          <Button
            onClick={handleUnlock}
            className="bg-gradient-gold text-primary-foreground hover:opacity-90"
          >
            <Lock className="size-4" aria-hidden="true" />
            Desbloquear por {unlock.priceLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
