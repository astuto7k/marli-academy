import { Link } from "@tanstack/react-router";
import { Bell, Crown, Flame, Search } from "lucide-react";
import type { ReactNode } from "react";

import { AppSidebar } from "@/components/academy/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useProgress } from "@/hooks/use-progress";

export interface AcademyShellProps {
  readonly children: ReactNode;
  readonly memberName?: string;
}

export function AcademyShell({ children, memberName = "Aluna" }: AcademyShellProps) {
  const { points, level, hydrated } = useProgress();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:px-6">
            <SidebarTrigger aria-label="Alternar menu lateral" />

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold sm:inline-flex">
                <Crown className="size-3.5" aria-hidden="true" />
                Nível {level.level} · {level.name}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground">
                <Flame className="size-3.5 text-gold" aria-hidden="true" />
                {hydrated ? points : 0} pts
              </span>
              <Button variant="ghost" size="icon" aria-label="Buscar aulas">
                <Search className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-gold" />
              </Button>
              <Link to="/minha-rota" aria-label="Minha rota">
                <Avatar className="size-9 border border-gold/40">
                  <AvatarFallback className="bg-secondary text-xs font-medium text-gold">
                    {memberName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-border/60 py-6">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Marli Teixeira Academy · Conteúdo educacional. As
              medalhas representam progresso na plataforma e não são certificação profissional
              oficial.
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
