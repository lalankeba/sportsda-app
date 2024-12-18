import { MEMBER_SELF_PATH } from "@/utils/paths";
import { getNecessaryHeaders } from "@/utils/server-headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const memberSelfUrl = `${process.env.BACKEND_BASE_URL}${MEMBER_SELF_PATH}`;
  const headers = await getNecessaryHeaders(request);

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
  const { indexNo, gender, facultyId, province, school, v } = await request.json();

  const updateUrl = `${process.env.BACKEND_BASE_URL}${MEMBER_SELF_PATH}`;
  const headers = await getNecessaryHeaders(request);

  try {
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ indexNo, gender, facultyId, province, school, v }),
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in member update: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
