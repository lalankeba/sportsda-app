import { MEMBER_SELF_PATH } from "@/utils/paths";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const memberSelfUrl = `${process.env.BACKEND_BASE_URL}${MEMBER_SELF_PATH}`;
  const headers = new Headers(request.headers);
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(memberSelfUrl, {
      method: 'GET',
      headers: headers,
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in member self: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
