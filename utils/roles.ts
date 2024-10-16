import Role from "@/enums/role";
import { auth } from '@clerk/nextjs/server';

export const checkRole = (roles: Role[]) => {
  const { sessionClaims } = auth();
  return sessionClaims?.metadata.roles === roles
}