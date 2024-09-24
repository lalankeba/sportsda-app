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
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in login: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
