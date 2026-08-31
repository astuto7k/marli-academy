import { Link, useRouterState } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Crown,
  GraduationCap,
  Home,
  Layers,
  Library,
  Lock,
  Radio,
  Rocket,
  Route as RouteIcon,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import mtLogo from "@/assets/mt-logo.png";

interface NavItem {
  readonly title: string;
  readonly url: string;
  readonly icon: LucideIcon;
  /** Itens ainda não construídos ficam visíveis, porém desabilitados. */
  readonly soon?: boolean;
  /** Link externo (abre em nova aba), ex.: suporte no WhatsApp. */
  readonly external?: boolean;
}

const MAIN_ITEMS: readonly NavItem[] = [
  { title: "Início", url: "/", icon: Home },
  { title: "Minha rota", url: "/minha-rota", icon: RouteIcon },
  { title: "Quem é Marli", url: "/sobre", icon: Sparkles },
];

const CONTENT_ITEMS: readonly NavItem[] = [
  { title: "Fundamentos", url: "/nucleo/base", icon: BookOpen },
  { title: "Trilhas técnicas", url: "/nucleo/trilhas", icon: Layers },
  { title: "Negócio e autoridade", url: "/nucleo/negocio", icon: GraduationCap },
  { title: "Crescimento e escala", url: "/nucleo/escala", icon: Rocket },
];

const EXTRA_ITEMS: readonly NavItem[] = [
  { title: "Biblioteca de materiais", url: "/biblioteca", icon: Library },
  { title: "Grupo no WhatsApp", url: "/comunidade", icon: Users },
  { title: "Desafios da semana", url: "/ao-vivo", icon: Radio },
  { title: "Certificados", url: "/certificados", icon: Award },
  { title: "Loja da aluna", url: "/loja", icon: ShoppingBag },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (router) => router.location.pathname });

  const renderItems = (items: readonly NavItem[]) =>
    items.map((item) => {
      const isActive = !item.external && pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild={!item.soon} isActive={isActive} disabled={item.soon}>
            {item.soon ? (
              <span className="flex items-center gap-2 opacity-50">
                <item.icon className="size-4" aria-hidden="true" />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.title}</span>
                    <Lock className="ml-auto size-3" aria-hidden="true" />
                  </>
                )}
              </span>
            ) : item.external ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2"
              >
                <item.icon className="size-4" aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </a>
            ) : (
              <Link to={item.url} className="flex items-center gap-2">
                <item.icon className="size-4" aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2.5 px-3 py-4">
          {collapsed ? (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground">
              <Crown className="size-4" aria-hidden="true" />
            </span>
          ) : (
            <span className="block w-full">
              <img
                src={mtLogo}
                alt="Marli Teixeira"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
              <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                Academy
              </span>
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(MAIN_ITEMS)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Formação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(CONTENT_ITEMS)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Extras</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(EXTRA_ITEMS)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
