import Image from "next/image";
import { posterUrl } from "@/lib/tmdb/images";
import { cn } from "@/lib/utils/cn";
import type { HomePoster } from "@/lib/services/home";

interface PosterMarqueeProps {
  posters: HomePoster[];
  /** Dirección del scroll infinito. */
  direction?: "left" | "right";
  className?: string;
}

export function PosterMarquee({
  posters,
  direction = "left",
  className,
}: PosterMarqueeProps) {
  if (posters.length === 0) return null;

  // Duplicamos la tira para que el loop CSS no tenga huecos.
  const strip = [...posters, ...posters];

  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden py-2",
        "mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max gap-3 will-change-transform",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
        )}
      >
        {strip.map((poster, index) => {
          const src = posterUrl(poster.posterPath, "w185");
          return (
            <div
              key={`${poster.tmdbId}-${index}`}
              className="border-cinema-border/50 relative aspect-[2/3] w-[76px] shrink-0 overflow-hidden rounded-lg border opacity-70 sm:w-[92px] sm:opacity-75 lg:w-[104px]"
            >
              {src && (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
