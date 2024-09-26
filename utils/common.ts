"use server";

import { cookies, headers } from "next/headers";
import { KEY_TOKEN } from "./constants";

const getToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(KEY_TOKEN)?.value;
  return token;
}

const getUrl = () => {
  const headersList = headers();
  const host = headersList.get('host');
  const xForwardedProto = headersList.get('x-forwarded-proto');
  const protocol = xForwardedProto ? xForwardedProto : (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  return `${protocol}://${host}`;
}

export { getToken, getUrl };