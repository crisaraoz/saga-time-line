"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useWatchProgress } from "@/hooks/useWatchProgress";

export type TimelineDensity = "list" | "compact";

type WatchProgress = ReturnType<typeof useWatchProgress>;

type FranchiseUiContextValue = WatchProgress & {
  density: TimelineDensity;
  setDensity: (density: TimelineDensity) => void;
};

const FranchiseUiContext = createContext<FranchiseUiContextValue | null>(null);

/**
 * Progreso de vistas + densidad del timeline. Viven en columnas distintas en
 * desktop, así que comparten estado por contexto.
 */
export function WatchProgressProvider({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { watchedIds, toggle, reset } = useWatchProgress(slug);
  const [density, setDensityState] = useState<TimelineDensity>("list");

  const setDensity = useCallback((next: TimelineDensity) => {
    setDensityState(next);
  }, []);

  const value = useMemo(
    () => ({ watchedIds, toggle, reset, density, setDensity }),
    [watchedIds, toggle, reset, density, setDensity],
  );

  return (
    <FranchiseUiContext.Provider value={value}>
      {children}
    </FranchiseUiContext.Provider>
  );
}

export function useWatchProgressContext(): FranchiseUiContextValue {
  const context = useContext(FranchiseUiContext);
  if (!context) {
    throw new Error("useWatchProgressContext requiere un WatchProgressProvider");
  }
  return context;
}
