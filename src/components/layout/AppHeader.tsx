import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { GitHubIcon, InstagramIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

const GITHUB_URL = "https://github.com/crisaraoz";
const INSTAGRAM_URL = "https://www.instagram.com/cris.araozz/";
const LINKEDIN_URL = "https://www.linkedin.com/in/cris-araoz/";

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cinema-muted hover:text-cinema-accent text-[10px] tracking-wide transition-colors duration-200 sm:text-[11px]"
      >
        Developed by <span className="font-medium">CrisAraoz</span>
      </a>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub de Cris"
        className="text-cinema-muted hover:text-white inline-flex size-8 items-center justify-center transition-colors duration-200"
      >
        <GitHubIcon className="size-[18px]" />
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Cris"
        className="text-cinema-muted hover:text-[#E4405F] inline-flex size-8 items-center justify-center transition-colors duration-200"
      >
        <InstagramIcon className="size-[18px]" />
      </a>
    </div>
  );
}

export function AppHeader({
  showSearch = true,
  variant = "default",
}: {
  showSearch?: boolean;
  /** En home el logo grande vive en el hero: el header se vuelve más liviano. */
  variant?: "default" | "home";
}) {
  const isHome = variant === "home";

  return (
    <header
      className={cn(
        "sticky top-0 z-20",
        isHome
          ? "bg-cinema-bg/40 border-transparent"
          : "bg-cinema-bg border-cinema-border border-b",
      )}
    >
      <div
        className={
          showSearch
            ? "mx-auto flex max-w-md flex-col gap-3 px-4 py-3 md:max-w-2xl lg:max-w-6xl lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:py-4"
            : "mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-2xl lg:max-w-6xl lg:px-8 lg:py-4"
        }
      >
        <div className="flex w-full items-center justify-between lg:w-auto lg:shrink-0">
          <Link
            href="/"
            className={cn(
              "font-semibold tracking-tight",
              isHome ? "text-sm opacity-70" : "text-lg",
            )}
          >
            Saga<span className="text-cinema-accent">Flow</span>
          </Link>
          <SocialLinks className="lg:hidden" />
        </div>

        {showSearch && <SearchBar />}

        <SocialLinks className="ml-auto hidden lg:flex" />
      </div>
    </header>
  );
}
