import { NextRequest, NextResponse } from "next/server";
import { getUserCollections } from "@repo/public-db/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    console.log("HERE");
    const { userId } = params;
    const availableCollections = await getUserCollections(userId);
    console.log(`TEST ME2 ${JSON.stringify(availableCollections)}`);
    return NextResponse.json(
      { collections: availableCollections },
      { status: 200 },
    );
  } catch (error) {
    console.log(`error fetching collections for user ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
