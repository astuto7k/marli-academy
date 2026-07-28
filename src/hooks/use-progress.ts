import { useCallback, useEffect, useMemo, useState } from "react";

import {
  POINTS,
  levelForPoints,
  medals,
  modules,
  nextLevelForPoints,
  type RotaId,
} from "@/data/academy";

/**
 * Progresso da aluna persistido no navegador.
 *
 * Sem backend nesta versão: o estado vive em localStorage e é lido apenas
 * depois da hidratação para não gerar divergência entre servidor e cliente.
 */

const STORAGE_KEY = "mta-progress-v1";

export interface ProgressState {
  readonly rota: RotaId | null;
  /** Chaves no formato `${moduleSlug}::${lessonIndex}`. */
  readonly lessons: readonly string[];
  readonly challenges: readonly string[];
  readonly proUnlocked: readonly string[];
  readonly passePro: boolean;
}

const EMPTY_STATE: ProgressState = {
  rota: null,
  lessons: [],
  challenges: [],
  proUnlocked: [],
  passePro: false,
};

function readState(): ProgressState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      rota: parsed.rota ?? null,
      lessons: Array.isArray(parsed.lessons) ? parsed.lessons : [],
      challenges: Array.isArray(parsed.challenges) ? parsed.challenges : [],
      proUnlocked: Array.isArray(parsed.proUnlocked) ? parsed.proUnlocked : [],
      passePro: Boolean(parsed.passePro),
    };
  } catch {
    // Estado corrompido não deve quebrar a plataforma.
    return EMPTY_STATE;
  }
}

export function lessonKey(moduleSlug: string, lessonIndex: number): string {
  return `${moduleSlug}::${lessonIndex}`;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Modo privado / cota cheia: seguimos apenas com o estado em memória.
    }
  }, []);

  const toggleLesson = useCallback(
    (moduleSlug: string, lessonIndex: number) => {
      const key = lessonKey(moduleSlug, lessonIndex);
      setState((current) => {
        const has = current.lessons.includes(key);
        const next: ProgressState = {
          ...current,
          lessons: has
            ? current.lessons.filter((item) => item !== key)
            : [...current.lessons, key],
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* noop */
        }
        return next;
      });
    },
    [],
  );

  const toggleChallenge = useCallback((moduleSlug: string) => {
    setState((current) => {
      const has = current.challenges.includes(moduleSlug);
      const next: ProgressState = {
        ...current,
        challenges: has
          ? current.challenges.filter((item) => item !== moduleSlug)
          : [...current.challenges, moduleSlug],
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const setRota = useCallback(
    (rota: RotaId) => persist({ ...readState(), rota }),
    [persist],
  );

  const completedIn = useCallback(
    (moduleSlug: string) =>
      state.lessons.filter((key) => key.startsWith(`${moduleSlug}::`)).length,
    [state.lessons],
  );

  const derived = useMemo(() => {
    const moduleProgress = modules.map((item) => {
      const done = state.lessons.filter((key) => key.startsWith(`${item.slug}::`)).length;
      const total = item.lessons.length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      return { slug: item.slug, done, total, percent, completed: done === total && total > 0 };
    });

    const completedModules = moduleProgress.filter((item) => item.completed);
    const points =
      state.lessons.length * POINTS.lesson +
      completedModules.length * POINTS.module +
      state.challenges.length * POINTS.challenge;

    const level = levelForPoints(points);
    const nextLevel = nextLevelForPoints(points);
    const earnedMedals = medals.filter((medal) =>
      medal.moduleSlug
        ? completedModules.some((item) => item.slug === medal.moduleSlug)
        : false,
    );

    return {
      moduleProgress,
      completedModulesCount: completedModules.length,
      points,
      level,
      nextLevel,
      earnedMedals,
      lessonsCompleted: state.lessons.length,
    };
  }, [state.challenges.length, state.lessons]);

  const progressOf = useCallback(
    (moduleSlug: string) =>
      derived.moduleProgress.find((item) => item.slug === moduleSlug) ?? {
        slug: moduleSlug,
        done: 0,
        total: 0,
        percent: 0,
        completed: false,
      },
    [derived.moduleProgress],
  );

  return {
    hydrated,
    state,
    ...derived,
    completedIn,
    progressOf,
    toggleLesson,
    toggleChallenge,
    setRota,
  };
}
