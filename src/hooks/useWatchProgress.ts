"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_PREFIX = "sagaflow:watched:";
const EMPTY = "[]";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // El evento storage solo se dispara en otras pestañas; los cambios propios
  // se avisan a mano desde writeRaw.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeRaw(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Modo privado o cuota llena: seguimos sin persistir.
  }
  for (const listener of listeners) listener();
}

function parseIds(raw: string): Set<string> {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

/**
 * Progreso de visualización por franquicia.
 * Hoy persiste en localStorage; cuando haya login se cambia por /api/watched
 * sin tocar los componentes.
 */
export function useWatchProgress(slug: string) {
  const key = `${STORAGE_PREFIX}${slug}`;

  const getSnapshot = useCallback(() => readRaw(key), [key]);
  const getServerSnapshot = useCallback(() => EMPTY, []);
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const watchedIds = useMemo(() => parseIds(raw), [raw]);

  const toggle = useCallback(
    (id: string) => {
      const next = parseIds(readRaw(key));
      if (!next.delete(id)) next.add(id);
      writeRaw(key, JSON.stringify([...next]));
    },
    [key],
  );

  const reset = useCallback(() => writeRaw(key, EMPTY), [key]);

  return { watchedIds, toggle, reset };
}
