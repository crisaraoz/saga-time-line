import { NextResponse } from "next/server";
import { getLoreCap } from "@/lib/services/franchises";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ titleId: string }> },
) {
  const { titleId } = await params;
  const { value, hit } = await getLoreCap(titleId);

  if (!value) {
    return NextResponse.json(
      { error: "Todavía no hay LoreCap para este título" },
      { status: 404 },
    );
  }

  return NextResponse.json(value, { headers: { "x-cache": hit ? "HIT" : "MISS" } });
}
