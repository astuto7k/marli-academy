import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import mtLogo from "@/assets/mt-logo.png";

export function AuthPageShell({ children }: { readonly children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,144,74,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(184,144,74,0.1),transparent_30%)]" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-8 flex justify-center" aria-label="Voltar para o início">
          <img src={mtLogo} alt="Marli Teixeira Academy" className="h-16 w-auto object-contain" />
        </Link>
        {children}
      </div>
    </main>
  );
}
