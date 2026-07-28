import { Link } from "@tanstack/react-router";
import { Bell, Crown, Menu, Search } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Início", to: "/" },
  { label: "Cursos", to: "/", hash: "cursos" },
  { label: "Mentorias", to: "/", hash: "mentorias" },
  { label: "Comunidade", to: "/", hash: "comunidade" },
] as const;

export interface AcademyHeaderProps extends ComponentProps<"header"> {
  readonly memberName?: string;
}

export function AcademyHeader({
  className,
  memberName = "Aluna",
  ...props
}: AcademyHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = memberName.slice(0, 2).toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Marli Teixeira Academy">
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground">
            <Crown className="size-4" aria-hidden="true" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-base font-semibold tracking-wide text-foreground">
              Marli Teixeira
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              Academy
            </span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Buscar aulas">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-gold" />
          </Button>
          <Avatar className="size-9 border border-gold/40">
            <AvatarFallback className="bg-secondary text-xs font-medium text-gold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/60 px-4 py-3 lg:hidden" aria-label="Menu mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
