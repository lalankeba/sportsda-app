import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Role from "./enums/role";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  // Protect all routes starting with `/admin`
  const memberRoles = auth().sessionClaims?.metadata?.roles as Role[];
  const requiredRoles = [Role.Admin];
  const hasRoles = requiredRoles.some(role => memberRoles?.includes(role));

  if (isAdminRoute(req) && !hasRoles) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};