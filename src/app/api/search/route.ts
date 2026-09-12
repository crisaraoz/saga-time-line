import { NextResponse } from "next/server";
import { searchFranchises } from "@/lib/services/franchises";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const { value, hit } = await searchFranchises(query);

  return NextResponse.json(
    { results: value },
    { headers: { "x-cache": hit ? "HIT" : "MISS" } },
  );
}
