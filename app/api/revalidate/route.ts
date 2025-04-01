import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const { tag } = await req.json(); // Récupérer le tag à revalider
    revalidateTag(tag); // Revalidation du cache

    return NextResponse.json({ message: `Cache revalidated for tag: ${tag}` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to revalidate cache" }, { status: 500 });
  }
}
