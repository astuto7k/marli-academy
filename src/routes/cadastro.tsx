import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/cadastro")({ component: RegisterPage });

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputClass =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/50";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    if (password !== confirmation) return setError("As senhas não coincidem.");
    setLoading(true);
    try {
      await register(name, email, password);
      await navigate({ to: "/" });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageShell>
      <section className="rounded-3xl border border-border/70 bg-card/95 p-7 shadow-luxe backdrop-blur sm:p-9">
        <div className="mb-8 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Primeiro acesso</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">Crie sua conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Seu progresso ficará salvo na área de membros.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm text-foreground">
            Nome completo
            <span className="relative block">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${inputClass} pl-10`}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
              />
            </span>
          </label>
          <label className="block space-y-2 text-sm text-foreground">
            E-mail
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${inputClass} pl-10`}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </span>
          </label>
          <label className="block space-y-2 text-sm text-foreground">
            Senha
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${inputClass} px-10`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>
          <label className="block space-y-2 text-sm text-foreground">
            Confirmar senha
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${inputClass} pl-10`}
                type="password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
                autoComplete="new-password"
              />
            </span>
          </label>
          {error && (
            <p
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-gradient-gold text-primary-foreground hover:opacity-90"
          >
            {loading ? "Criando conta..." : "Criar minha conta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já possui cadastro?{" "}
          <Link to="/login" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      </section>
    </AuthPageShell>
  );
}
