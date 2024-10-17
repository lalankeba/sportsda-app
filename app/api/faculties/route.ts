import { FACULTIES_PATH } from "@/utils/paths";
import { getNecessaryHeaders } from "@/utils/server-headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}`;
  const headers = await getNecessaryHeaders(request);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in faculty: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}