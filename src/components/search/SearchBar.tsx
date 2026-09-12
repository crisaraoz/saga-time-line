"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent,
} from "react";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/Skeleton";
import type { FranchiseSearchResult } from "@/lib/services/franchises";
import { posterUrl } from "@/lib/tmdb/images";
import { cn } from "@/lib/utils/cn";

const DEBOUNCE_MS = 300;

interface SearchPayload {
  q: string;
  results: FranchiseSearchResult[];
}

export function SearchBar({
  size = "sm",
  autoFocus = false,
  className,
}: {
  size?: "sm" | "lg";
  autoFocus?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [payload, setPayload] = useState<SearchPayload | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();

  const trimmed = query.trim();
  const canSearch = trimmed.length >= 2;
  const matched = canSearch && payload?.q === trimmed;
  const results = matched ? payload.results : [];
  const searching = canSearch && !matched;

  useEffect(() => {
    if (!canSearch) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("search failed");
        const data = (await response.json()) as { results: FranchiseSearchResult[] };
        setPayload({ q: trimmed, results: data.results });
        setActiveIndex(-1);
        setOpen(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setPayload({ q: trimmed, results: [] });
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [canSearch, trimmed]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const goTo = useCallback(
    (slug: string) => {
      setOpen(false);
      setQuery("");
      setPayload(null);
      startTransition(() => {
        router.push(`/f/${slug}`);
      });
    },
    [router],
  );

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (!open && (event.key === "ArrowDown" || event.key === "Enter") && results.length > 0) {
      setOpen(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, -1));
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      goTo(results[activeIndex].slug);
    }
  }

  const showDropdown = open && canSearch;
  const showSkeleton = searching || loading;
  const busy = showSkeleton || isPending;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full",
        size === "sm" && "lg:max-w-sm lg:flex-1",
        className,
      )}
    >
      <label
        className={cn(
          "bg-cinema-surface border-cinema-border focus-within:border-cinema-muted flex items-center gap-2 rounded-full border",
          size === "lg" ? "px-5 py-3.5 shadow-lg shadow-black/30" : "px-4 py-2.5",
        )}
      >
        <SearchIcon
          className={cn(
            "text-cinema-muted shrink-0",
            size === "lg" ? "size-5" : "size-4",
          )}
        />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (canSearch) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
          }
          placeholder="Buscar una saga o franquicia"
          autoComplete="off"
          autoFocus={autoFocus}
          className={cn(
            "text-cinema-text placeholder:text-cinema-muted min-w-0 flex-1 bg-transparent outline-none",
            size === "lg" ? "text-base" : "text-sm",
          )}
        />
        {busy && (
          <span className="border-cinema-muted size-3.5 shrink-0 animate-spin rounded-full border-2 border-t-transparent" />
        )}
        {query && !busy && (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => {
              setQuery("");
              setPayload(null);
              setOpen(false);
            }}
            className="text-cinema-muted hover:text-cinema-text"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
      </label>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="bg-cinema-surface border-cinema-border absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-80 overflow-y-auto rounded-2xl border py-1 shadow-xl"
        >
          {showSkeleton && (
            <>
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index} className="flex items-center gap-3 px-3 py-2">
                  <Skeleton className="aspect-[2/3] w-9 shrink-0 rounded-md" />
                  <Skeleton className="h-3.5 w-40" />
                </li>
              ))}
            </>
          )}

          {!showSkeleton && results.length === 0 && (
            <li className="text-cinema-muted px-4 py-3 text-sm">
              Sin resultados para “{trimmed}”
            </li>
          )}

          {!showSkeleton &&
            results.map((result, index) => {
              const poster = posterUrl(result.posterPath, "w92");
              return (
                <li
                  key={`${result.slug}-${result.name}`}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goTo(result.slug)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors",
                      index === activeIndex
                        ? "bg-cinema-elevated"
                        : "hover:bg-cinema-elevated/60",
                    )}
                  >
                    <span className="bg-cinema-elevated relative aspect-[2/3] w-9 shrink-0 overflow-hidden rounded-md">
                      {poster ? (
                        <Image
                          src={poster}
                          alt=""
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-cinema-muted flex size-full items-center justify-center text-[8px]">
                          —
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 truncate text-sm font-medium">
                      {result.name}
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
