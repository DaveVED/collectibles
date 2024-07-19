import { NextRequest, NextResponse } from "next/server";
import { getAvailableCollectionTypes } from "@repo/public-db/queries";

export async function GET() {
  try {
    const availableCollections = await getAvailableCollectionTypes();
    return NextResponse.json(
      { collections: availableCollections },
      { status: 200 },
    );
  } catch (error) {
    console.log(`error fetching collection ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
