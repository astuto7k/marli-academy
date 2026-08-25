import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

const USERS_KEY = "marli-academy-users";
const SESSION_KEY = "marli-academy-session";

export interface Member {
  readonly name: string;
  readonly email: string;
}

interface StoredMember extends Member {
  readonly passwordHash: string;
}

interface AuthContextValue {
  readonly member: Member | null;
  readonly hydrated: boolean;
  readonly login: (email: string, password: string) => Promise<void>;
  readonly register: (name: string, email: string, password: string) => Promise<void>;
  readonly logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readUsers(): StoredMember[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredMember[];
  } catch {
    return [];
  }
}

function readSession(): Member | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null") as Member | null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMember(readSession());
    setHydrated(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = await hashPassword(password);
    const found = readUsers().find(
      (user) => user.email === normalizedEmail && user.passwordHash === passwordHash,
    );
    if (!found) throw new Error("E-mail ou senha inválidos.");

    const session = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setMember(session);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error("Já existe uma conta com este e-mail.");
    }

    const newUser: StoredMember = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setMember(session);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setMember(null);
  }, []);

  const value = useMemo(
    () => ({ member, hydrated, login, register, logout }),
    [hydrated, login, logout, member, register],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa ser usado dentro de AuthProvider.");
  return context;
}

export function MemberGuard({ children }: { readonly children: ReactNode }) {
  const { member, hydrated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      hydrated &&
      !member &&
      location.pathname !== "/login" &&
      location.pathname !== "/cadastro"
    ) {
      void navigate({ to: "/login" });
    }
  }, [hydrated, location.pathname, member, navigate]);

  if (!hydrated || !member) {
    return <div className="min-h-screen bg-background" aria-label="Carregando área de membros" />;
  }
  return <>{children}</>;
}
