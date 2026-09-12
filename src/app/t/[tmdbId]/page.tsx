import { notFound, redirect } from "next/navigation";
import { FranchiseView } from "@/components/franchise/FranchiseView";
import { AppHeader } from "@/components/layout/AppHeader";
import { getMovieGenres, getMovieRecommendations } from "@/lib/tmdb/client";
import { resolveTitleDestination } from "@/lib/services/titles";
import type { Recommendation } from "@/types";

interface TitlePageProps {
  params: Promise<{ tmdbId: string }>;
}

async function recommendationsForMovie(tmdbId: number): Promise<Recommendation[]> {
  try {
    const [{ results }, { genres }] = await Promise.all([
      getMovieRecommendations(tmdbId),
      getMovieGenres(),
    ]);
    const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));
    return results.slice(0, 12).map((movie) => ({
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      reason:
        movie.genre_ids.map((id) => genreMap[id]).filter(Boolean).slice(0, 2).join(" · ") ||
        (movie.release_date ? movie.release_date.slice(0, 4) : ""),
    }));
  } catch {
    return [];
  }
}

export default async function TitlePage({ params }: TitlePageProps) {
  const { tmdbId: raw } = await params;
  const tmdbId = Number(raw);
  if (!Number.isFinite(tmdbId) || tmdbId <= 0) notFound();

  const { value } = await resolveTitleDestination(tmdbId);
  if (!value) notFound();

  if (value.kind === "collection") {
    redirect(`/f/${value.slug}`);
  }

  const recommendations = await recommendationsForMovie(tmdbId);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <AppHeader />
      <FranchiseView
        franchise={value.franchise}
        recommendations={recommendations}
        loreCaps={{}}
      />
    </div>
  );
}
