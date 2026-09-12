"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FRANCHISE_CATEGORIES,
  FRANCHISE_CATEGORY_LABELS,
  type CuratedFranchise,
  type FranchiseCategory,
} from "@/data/curated-franchises";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

type CatalogItem = Pick<CuratedFranchise, "slug" | "name" | "tagline"> & {
  category: FranchiseCategory;
};

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
        <ul className="border-cinema-border mt-3 divide-y divide-cinema-border overflow-hidden rounded-2xl border">
          {filtered.map((franchise) => (
            <li key={franchise.slug}>
              <Link
                href={`/f/${franchise.slug}`}
                className="bg-cinema-surface hover:bg-cinema-elevated flex items-center gap-3 px-4 py-3.5 transition-colors active:opacity-80"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold lg:text-base">
                    {franchise.name}
                  </p>
                  {franchise.tagline && (
                    <p className="text-cinema-muted mt-0.5 truncate text-xs lg:text-sm">
                      {franchise.tagline}
                    </p>
                  )}
                </div>
                <span aria-hidden className="text-cinema-muted text-lg">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
