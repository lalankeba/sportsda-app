import { FACULTIES_PATH } from "@/utils/paths";
import { getNecessaryHeaders } from "@/utils/server-headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const url = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}/${id}`;
  const headers = await getNecessaryHeaders(request);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Faculty not found' }, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error(`Error fetching faculty with id ${id}: `, error);
    return NextResponse.json({ error: 'Error occurred. Please try later.' }, { status: 500 });
  }
}

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { name, v } = await request.json();

  const url = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}/${id}`;
  const headers = await getNecessaryHeaders(request);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ name, v }),
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in updating faculty: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  const url = `${process.env.BACKEND_BASE_URL}${FACULTIES_PATH}/${id}`;
  const headers = await getNecessaryHeaders(request);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('error occurred in deleting faculty: ', error);
    return NextResponse.json({ error: 'Some error occurred. Please try later.' }, { status: 500 });
  }
}