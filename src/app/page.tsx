import Link from "next/link";
import { PosterMarquee } from "@/components/home/PosterMarquee";
import { AppHeader } from "@/components/layout/AppHeader";
import { SearchBar } from "@/components/search/SearchBar";
import { getHomePosters } from "@/lib/services/home";

/** Atajos a franquicias curadas. */
const HOME_SHORTCUTS = [
  { slug: "el-senor-de-los-anillos", name: "La Tierra Media" },
  { slug: "harry-potter", name: "Harry Potter" },
  { slug: "star-wars", name: "Star Wars" },
  { slug: "mcu", name: "MCU" },
];

export default async function HomePage() {
  const { value: posters } = await getHomePosters();
  const hasMarquee = posters.top.length > 0 || posters.bottom.length > 0;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,_#2a2418_0%,_#0b0b0f_58%)]"
      />

      {hasMarquee && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-14 z-0 sm:top-16">
            <PosterMarquee posters={posters.top} direction="left" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-0">
            <PosterMarquee posters={posters.bottom} direction="right" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(11,11,15,0.82)_0%,_rgba(11,11,15,0.45)_42%,_transparent_70%)]"
          />
        </>
      )}

      <div className="relative z-10 flex min-h-dvh flex-col">
        <AppHeader showSearch={false} />

        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-8 sm:px-6">
          <h1 className="text-cinema-accent text-center text-[11px] font-semibold uppercase tracking-[0.2em]">
            Tu compañero de sillón
          </h1>
          <p className="text-cinema-muted mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed sm:text-base">
            Buscá una saga, ordená qué y como ver.
          </p>

          <div className="mt-8 w-full">
            <SearchBar size="lg" autoFocus className="mx-auto max-w-md" />
          </div>

          <section className="mt-10">
            <p className="text-cinema-muted mb-3 text-center text-[11px] font-semibold uppercase tracking-wide">
              Sugerencias
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {HOME_SHORTCUTS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/f/${item.slug}`}
                    className="border-cinema-border bg-cinema-surface/90 hover:border-cinema-accent/50 hover:text-cinema-accent inline-flex rounded-full border px-3.5 py-1.5 text-sm backdrop-blur-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 text-center">
              <Link
                href="/sagas"
                className="text-cinema-accent hover:text-cinema-text inline-flex items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:underline"
              >
                Lista de sagas famosas
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
