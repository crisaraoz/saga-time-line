"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useWatchProgress } from "@/hooks/useWatchProgress";

type WatchProgress = ReturnType<typeof useWatchProgress>;

const WatchProgressContext = createContext<WatchProgress | null>(null);

/**
 * El panel de progreso y el timeline viven en columnas distintas del layout de
 * escritorio, así que comparten el estado por contexto en vez de por props.
 */
export function WatchProgressProvider({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { watchedIds, toggle, reset } = useWatchProgress(slug);
  const value = useMemo(
    () => ({ watchedIds, toggle, reset }),
    [watchedIds, toggle, reset],
  );

  return (
    <WatchProgressContext.Provider value={value}>
      {children}
    </WatchProgressContext.Provider>
  );
}

export function useWatchProgressContext(): WatchProgress {
  const context = useContext(WatchProgressContext);
  if (!context) {
    throw new Error("useWatchProgressContext requiere un WatchProgressProvider");
  }
  return context;
}
