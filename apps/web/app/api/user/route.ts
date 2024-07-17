import { NextRequest, NextResponse } from 'next/server';
import { getUserByName } from '@repo/public-db/queries';
import { updateUserBasicDetails } from '@repo/public-db/updates';

export async function POST(request: NextRequest) {
  try {
    const { id, name, bio, location } = await request.json();
    
    const userWithSameName = await getUserByName(name);
    if (userWithSameName && userWithSameName.id !== id) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    await updateUserBasicDetails({ id, name, bio, location });
    return NextResponse.json({ message: 'Profile updated successfully' });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
