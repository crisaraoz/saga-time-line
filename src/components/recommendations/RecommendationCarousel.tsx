"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Poster } from "@/components/ui/Poster";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import type { Recommendation } from "@/types";

const DRAG_THRESHOLD = 6;

export function RecommendationCarousel({ items }: { items: Recommendation[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScroll: 0,
    axis: null as null | "x" | "y",
    moved: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [dragging, setDragging] = useState(false);

  const updateArrows = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setCanPrev(node.scrollLeft > 4);
    setCanNext(max > 4 && node.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    const frame = window.requestAnimationFrame(updateArrows);
    node.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (node.scrollWidth <= node.clientWidth) return;
      event.preventDefault();
      node.scrollLeft += event.deltaY;
    };
    node.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.cancelAnimationFrame(frame);
      node.removeEventListener("scroll", updateArrows);
      node.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateArrows);
    };
  }, [items, updateArrows]);

  function scrollByCards(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = Math.max(node.clientWidth * 0.75, 160);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    // Solo botón primario del mouse; touch y pen siempre.
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const node = scrollerRef.current;
    if (!node || node.scrollWidth <= node.clientWidth) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScroll: node.scrollLeft,
      axis: null,
      moved: false,
    };
    node.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const node = scrollerRef.current;
    if (!node) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.axis) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      // Si el gesto es más vertical, soltamos y dejamos scrollear la página.
      drag.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (drag.axis === "y") {
        drag.pointerId = -1;
        setDragging(false);
        if (node.hasPointerCapture(event.pointerId)) {
          node.releasePointerCapture(event.pointerId);
        }
        return;
      }
      setDragging(true);
    }

    if (drag.axis !== "x") return;

    event.preventDefault();
    drag.moved = true;
    node.scrollLeft = drag.startScroll - dx;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const node = scrollerRef.current;
    if (node?.hasPointerCapture(event.pointerId)) {
      node.releasePointerCapture(event.pointerId);
    }
    // moved queda un tick para que el click del Link se cancele.
    const wasMoved = drag.moved;
    drag.pointerId = -1;
    drag.axis = null;
    setDragging(false);
    if (wasMoved) {
      window.setTimeout(() => {
        drag.moved = false;
      }, 0);
    }
  }

  function onCardClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  }

  if (items.length === 0) return null;

  return (
    <section className="mt-8 max-w-full min-w-0 overflow-x-hidden lg:mt-10">
      <div className="mb-3 flex items-center justify-between px-4 lg:px-0">
        <h2 className="text-sm font-semibold lg:text-base">Si te gustó, seguí con…</h2>
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            aria-label="Anterior"
            disabled={!canPrev}
            onClick={() => scrollByCards(-1)}
            className={cn(
              "border-cinema-border bg-cinema-surface flex size-8 items-center justify-center rounded-full border transition-colors",
              canPrev
                ? "hover:border-cinema-muted text-cinema-text"
                : "text-cinema-muted cursor-default opacity-40",
            )}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            disabled={!canNext}
            onClick={() => scrollByCards(1)}
            className={cn(
              "border-cinema-border bg-cinema-surface flex size-8 items-center justify-center rounded-full border transition-colors",
              canNext
                ? "hover:border-cinema-muted text-cinema-text"
                : "text-cinema-muted cursor-default opacity-40",
            )}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "no-scrollbar flex max-w-full gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 lg:gap-4 lg:px-0",
          "touch-pan-y",
          dragging ? "cursor-grabbing select-none" : "cursor-grab",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.tmdbId}
            href={`/t/${item.tmdbId}`}
            draggable={false}
            onClick={onCardClick}
            onDragStart={(event) => event.preventDefault()}
            className="group w-28 shrink-0 lg:w-36"
          >
            <Poster
              path={item.posterPath}
              alt={item.title}
              size="w342"
              sizes="(min-width: 1024px) 144px, 112px"
              className="border-cinema-border pointer-events-none w-full rounded-xl border transition-transform group-hover:scale-[1.02]"
            />
            <p className="group-hover:text-cinema-accent mt-2 truncate text-xs font-medium transition-colors lg:text-sm">
              {item.title}
            </p>
            <p className="text-cinema-muted mt-0.5 truncate text-[10px] lg:text-xs">
              {item.reason}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
