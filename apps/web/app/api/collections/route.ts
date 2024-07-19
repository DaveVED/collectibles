import { createUserCollection } from "@repo/public-db/inserts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, collectionTypeId } = await request.json();

    const result = await createUserCollection({
      collection_type_id: collectionTypeId,
      user_id: userId,
    });
    return NextResponse.json({ message: "Collections updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
