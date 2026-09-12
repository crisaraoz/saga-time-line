interface Entry<T> {
  value: T;
  expiresAt: number;
}

const DEFAULT_TTL_MS = 1000 * 60 * 60; // 1 hora

/**
 * Subir esta versión al cambiar la forma de los objetos cacheados: la caché
 * sobrevive al hot-reload, así que si no se invalida quedan entradas viejas
 * con campos faltantes.
 */
const CACHE_VERSION = "v13";

const namespaced = (key: string) => `${CACHE_VERSION}:${key}`;

// Sobrevive al hot-reload de Next en desarrollo.
const store: Map<string, Entry<unknown>> =
  (globalThis as { __sagaflowCache?: Map<string, Entry<unknown>> }).__sagaflowCache ??
  new Map();

(globalThis as { __sagaflowCache?: Map<string, Entry<unknown>> }).__sagaflowCache = store;

export function getCached<T>(key: string): T | null {
  const storeKey = namespaced(key);
  const entry = store.get(storeKey) as Entry<T> | undefined;
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    store.delete(storeKey);
    return null;
  }
  return entry.value;
}

export function setCached<T>(key: string, value: T, ttlMs = DEFAULT_TTL_MS): T {
  store.set(namespaced(key), { value, expiresAt: Date.now() + ttlMs });
  return value;
}

export async function withCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<{ value: T; hit: boolean }> {
  const cached = getCached<T>(key);
  if (cached !== null) return { value: cached, hit: true };
  const value = await loader();
  setCached(key, value, ttlMs);
  return { value, hit: false };
}

export function clearCache(prefix?: string): void {
  if (!prefix) {
    store.clear();
    return;
  }
  const storePrefix = namespaced(prefix);
  for (const key of store.keys()) {
    if (key.startsWith(storePrefix)) store.delete(key);
  }
}
