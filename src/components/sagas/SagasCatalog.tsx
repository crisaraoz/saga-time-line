"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FRANCHISE_CATEGORIES,
  FRANCHISE_CATEGORY_LABELS,
  type FranchiseCategory,
} from "@/data/curated-franchises";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { CatalogItem } from "@/lib/services/catalog";
import { posterUrl } from "@/lib/tmdb/images";
import { cn } from "@/lib/utils/cn";

export function SagasCatalog({ items }: { items: CatalogItem[] }) {
  const [category, setCategory] = useState<FranchiseCategory | "">("");

  const filtered = useMemo(() => {
    if (!category) return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-cinema-muted shrink-0 text-[11px] tabular-nums">
          {filtered.length}
          {category ? `/${items.length}` : ""} sagas
        </p>

        <div className="flex items-center gap-2">
          <div className="relative">
            <label className="sr-only" htmlFor="saga-category">
              Categoría
            </label>
            <select
              id="saga-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as FranchiseCategory | "")
              }
              className="border-cinema-border bg-cinema-elevated text-cinema-text focus:border-cinema-accent/60 h-8 w-auto max-w-[9.5rem] cursor-pointer appearance-none rounded-lg border py-0 pr-7 pl-2.5 text-[12px] outline-none"
            >
              <option value="">Todas</option>
              {FRANCHISE_CATEGORIES.map((key) => (
                <option key={key} value={key}>
                  {FRANCHISE_CATEGORY_LABELS[key]}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="text-cinema-muted pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2" />
          </div>

          <button
            type="button"
            onClick={() => setCategory("")}
            disabled={!category}
            aria-label="Limpiar filtro"
            className={cn(
              "text-[11px] font-medium underline-offset-2 transition-colors",
              category
                ? "text-cinema-muted hover:text-cinema-accent hover:underline"
                : "text-cinema-muted/30 cursor-default",
            )}
          >
            Limpiar
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-cinema-muted mt-8 text-center text-sm">
          No hay sagas en esta categoría.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:gap-2.5 lg:grid-cols-2">
          {filtered.map((franchise) => {
            const src = posterUrl(franchise.posterPath, "w185");
            return (
              <li key={franchise.slug}>
                <Link
                  href={`/f/${franchise.slug}`}
                  className="border-cinema-border bg-cinema-surface hover:border-cinema-accent/35 hover:bg-cinema-elevated group flex items-center gap-3 rounded-2xl border p-2.5 transition-[border-color,background-color,transform] active:scale-[0.99] sm:gap-3.5 sm:p-3"
                >
                  <div className="bg-cinema-elevated relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-lg sm:w-14">
                    {src ? (
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="text-cinema-muted flex size-full items-center justify-center text-[9px]">
                        —
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="group-hover:text-cinema-accent truncate text-sm font-semibold transition-colors sm:text-[15px]">
                      {franchise.name}
                    </p>
                    {franchise.tagline && (
                      <p className="text-cinema-muted mt-0.5 line-clamp-2 text-[11px] leading-snug sm:text-xs">
                        {franchise.tagline}
                      </p>
                    )}
                    <span className="text-cinema-muted border-cinema-border/80 mt-1.5 inline-flex rounded-full border px-2 py-0.5 text-[10px]">
                      {FRANCHISE_CATEGORY_LABELS[franchise.category]}
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="text-cinema-muted group-hover:text-cinema-accent pr-1 text-lg transition-colors"
                  >
                    ›
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
