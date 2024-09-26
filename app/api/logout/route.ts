import { KEY_TOKEN } from "@/utils/constants";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set(KEY_TOKEN, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('error occurred in logout: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
