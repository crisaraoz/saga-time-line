import Image from "next/image";
import Link from "next/link";
import { PosterMarquee } from "@/components/home/PosterMarquee";
import { AppHeader } from "@/components/layout/AppHeader";
import { SearchBar } from "@/components/search/SearchBar";
import { getHomePosters, getHomeShortcuts } from "@/lib/services/home";
import { posterUrl } from "@/lib/tmdb/images";

export default async function HomePage() {
  const [{ value: posters }, { value: shortcuts }] = await Promise.all([
    getHomePosters(),
    getHomeShortcuts(),
  ]);
  const hasMarquee = posters.top.length > 0 || posters.bottom.length > 0;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#2a2418_0%,_#0b0b0f_55%)]"
      />

      {hasMarquee && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-12 z-0 sm:top-14">
            <PosterMarquee posters={posters.top} direction="left" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-0">
            <PosterMarquee posters={posters.bottom} direction="right" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(11,11,15,0.88)_0%,_rgba(11,11,15,0.55)_38%,_transparent_68%)]"
          />
        </>
      )}

      <div className="relative z-10 flex min-h-dvh flex-col">
        <AppHeader showSearch={false} variant="home" />

        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8">
          <div className="text-center">
            <p className="text-cinema-muted text-[11px] font-medium tracking-[0.22em] uppercase">
              Tu compañero de sillón
            </p>
            <h1 className="mt-2 text-[2.75rem] leading-none font-bold tracking-tight sm:text-6xl">
              Saga<span className="text-cinema-accent">Flow</span>
            </h1>
            <p className="text-cinema-muted mx-auto mt-3 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-[15px]">
              Buscá una saga y seguí el hilo sin spoilers.
            </p>
          </div>

          <div className="mt-7 w-full sm:mt-8">
            <SearchBar size="lg" autoFocus className="mx-auto max-w-md" />
          </div>

          <section className="mt-8 sm:mt-9">
            <div className="mb-3 flex items-end justify-between gap-3 px-0.5">
              <p className="text-cinema-muted text-[11px] font-semibold tracking-wide uppercase">
                Algunas sugerencias
              </p>
            </div>

            <ul className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {shortcuts.map((item) => {
                const src = posterUrl(item.posterPath, "w185");
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/f/${item.slug}`}
                      className="group block transition-transform active:scale-[0.97]"
                    >
                      <div className="border-cinema-border bg-cinema-surface relative aspect-[2/3] overflow-hidden rounded-xl border shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] group-hover:border-cinema-accent/40 group-hover:shadow-[0_8px_28px_rgba(245,181,68,0.12)]">
                        {src ? (
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 22vw, 100px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="from-cinema-elevated to-cinema-surface absolute inset-0 bg-gradient-to-b" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-1.5 pt-8 pb-1.5 sm:px-2 sm:pb-2">
                          <p className="truncate text-center text-[10px] font-semibold text-white sm:text-[11px]">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 text-center sm:mt-7">
              <Link
                href="/sagas"
                className="border-cinema-border bg-cinema-surface/80 text-cinema-text hover:border-cinema-accent/50 hover:text-cinema-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors"
              >
                Lista de sagas famosas
                <span aria-hidden className="text-cinema-accent">
                  →
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
