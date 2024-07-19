import { NextRequest, NextResponse } from "next/server";
import { getUserOpCards } from "@repo/public-db/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
    console.log("HERE");
    const userCards = await getUserOpCards("9ab9caab-a8ef-45d4-86f1-5738b4587496", 1);
    console.log(`TEST ME2 ${JSON.stringify(userCards)}`);
    console.log("BING BONG");
    return NextResponse.json(
      { cards: userCards },
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
