import { auth } from "@clerk/nextjs/server";

const getNecessaryHeaders = async (request: Request) => {
  const { getToken } = auth();
  const token = await getToken();

  const headers = new Headers(request.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  return headers;
}

export {getNecessaryHeaders};
