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

export const PUT = async (request: Request) => {
  const { firstName, lastName, gender, facultyId, v } = await request.json();

  const updateUrl = `${process.env.BACKEND_BASE_URL}${MEMBER_SELF_PATH}`;
  const headers = new Headers(request.headers);
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ firstName, lastName, gender, facultyId, v }),
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in update: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
