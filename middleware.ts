import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Role from "./enums/role";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher([
  '/dashboard/faculties(.*)',
  '/dashboard/members(.*)',
]);
const isInstructorRoute = createRouteMatcher([
  '/dashboard/matches(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const memberRoles = auth().sessionClaims?.metadata?.roles as Role[] || [];

  const isAdmin = memberRoles.includes(Role.Admin);
  const isInstructor = memberRoles.includes(Role.Instructor);

  if (isAdminRoute(req) && !isAdmin) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (isInstructorRoute(req) && !isInstructor) {
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
