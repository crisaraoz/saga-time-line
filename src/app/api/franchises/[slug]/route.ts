import { NextResponse } from "next/server";
import { getFranchiseBySlug, getRecommendations } from "@/lib/services/franchises";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const [franchise, recommendations] = await Promise.all([
    getFranchiseBySlug(slug),
    getRecommendations(slug),
  ]);

  if (!franchise.value) {
    return NextResponse.json({ error: "Franquicia no encontrada" }, { status: 404 });
  }

  return NextResponse.json(
    { franchise: franchise.value, recommendations: recommendations.value },
    { headers: { "x-cache": franchise.hit ? "HIT" : "MISS" } },
  );
}
