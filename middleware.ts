import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Define all public (non-protected) routes here
const isPublicRoute = createRouteMatcher([
  "/",              // Home
  "/about",         // About
  "/contact",       // Contact
  "/menu",          // Menu
  "/sign-in(.*)",   // Sign-in
  "/sign-up(.*)",   // Sign-up
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
 
  if (isPublicRoute(req)) return;

  const { userId } = await auth();

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    // Redirect back after sign-in
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  // ✅ Match all routes except static assets and internal Next.js files
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"],
};
