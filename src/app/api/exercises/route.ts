import { NextRequest, NextResponse } from "next/server";
import { searchExercises } from "@/lib/exercisedb/client";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const result = await searchExercises({
    query: params.get("query") ?? undefined,
    bodyPart: params.get("bodyPart") ?? undefined,
    target: params.get("target") ?? undefined,
    equipment: params.get("equipment") ?? undefined,
    limit: params.get("limit") ? Number(params.get("limit")) : undefined,
    offset: params.get("offset") ? Number(params.get("offset")) : undefined,
  });

  return NextResponse.json(result);
}
