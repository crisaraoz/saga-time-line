import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";

export function AppHeader({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <header className="bg-cinema-bg/85 border-cinema-border sticky top-0 z-20 border-b backdrop-blur">
      <div
        className={
          showSearch
            ? "mx-auto flex max-w-md flex-col gap-3 px-4 py-3 md:max-w-2xl lg:max-w-6xl lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:py-4"
            : "mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-2xl lg:max-w-6xl lg:px-8 lg:py-4"
        }
      >
        <div className="flex w-full items-center justify-between lg:w-auto lg:shrink-0">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Saga<span className="text-cinema-accent">Flow</span>
          </Link>
          <span className="border-cinema-border text-cinema-muted rounded-full border px-2 py-0.5 text-[11px] lg:hidden">
            AR
          </span>
        </div>

        {showSearch && <SearchBar />}

        <span className="border-cinema-border text-cinema-muted ml-auto hidden rounded-full border px-2.5 py-1 text-xs lg:block">
          AR
        </span>
      </div>
    </header>
  );
}
