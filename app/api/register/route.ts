import { REGISTER_PATH } from "@/utils/paths";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { firstName, lastName, email, password, gender, facultyId } = await request.json();

  const registerUrl = `${process.env.BACKEND_BASE_URL}${REGISTER_PATH}`;

  try {
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, gender, facultyId }),
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in register: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}
