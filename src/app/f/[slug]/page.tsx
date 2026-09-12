import { notFound } from "next/navigation";
import { FranchiseView } from "@/components/franchise/FranchiseView";
import { AppHeader } from "@/components/layout/AppHeader";
import { getFranchiseBySlug, getRecommendations } from "@/lib/services/franchises";
import { mockLoreCaps } from "@/mocks/franchises";

interface FranchisePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FranchisePageProps) {
  const { slug } = await params;
  const { value } = await getFranchiseBySlug(slug);
  if (!value) return { title: "Franquicia no encontrada · SagaFlow" };
  return {
    title: `${value.name} · SagaFlow`,
    description: value.tagline ?? `Ruta de visualización de ${value.name}`,
  };
}

export default async function FranchisePage({ params }: FranchisePageProps) {
  const { slug } = await params;
  const [franchise, recommendations] = await Promise.all([
    getFranchiseBySlug(slug),
    getRecommendations(slug),
  ]);

  if (!franchise.value) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <FranchiseView
        franchise={franchise.value}
        recommendations={recommendations.value}
        loreCaps={mockLoreCaps}
      />
    </div>
  );
}
