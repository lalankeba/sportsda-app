import { KEY_TOKEN } from "@/utils/constants";
import { LOGIN_PATH } from "@/utils/paths";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  const loginUrl = `${process.env.BACKEND_BASE_URL}${LOGIN_PATH}`;

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseBody = await response.json();

    if (response.ok) {
      const nextResponse = NextResponse.json(responseBody, { status: response.status });
      nextResponse.cookies.set(KEY_TOKEN, responseBody.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // Set cookie expiry (7 days in this case)
      });
      return nextResponse;
    }

    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in login: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
