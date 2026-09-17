import { NextRequest, NextResponse } from "next/server";
import { fetchExerciseGif } from "@/lib/exercisedb/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const resolution = request.nextUrl.searchParams.get("resolution") ?? "180";

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const gif = await fetchExerciseGif(id, resolution);
  if (!gif) {
    return NextResponse.redirect(new URL("/exercise-placeholder.svg", request.url));
  }

  return new NextResponse(gif.body, {
    headers: {
      "Content-Type": gif.contentType,
      // The gif for a given exercise id never changes — cache hard on the
      // client to avoid burning the (very limited) monthly API quota.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
