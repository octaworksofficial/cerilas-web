import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
]);

const isPublicApiRoute = createRouteMatcher([
  '/api/newsletter',
  '/api/partners',
  '/api/projects',
  '/api/statistics',
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public API routes to pass through
  if (isPublicApiRoute(req)) {
    return NextResponse.next();
  }

  // Protect dashboard and onboarding routes
  if (isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url);

    await auth.protect({
      unauthenticatedUrl: signInUrl.toString(),
    });

    const authObj = await auth();

    // Redirect to organization selection if user doesn't have an org
    if (
      authObj.userId
      && !authObj.orgId
      && req.nextUrl.pathname.includes('/dashboard')
      && !req.nextUrl.pathname.endsWith('/organization-selection')
    ) {
      const orgSelection = new URL(
        '/onboarding/organization-selection',
        req.url,
      );

      return NextResponse.redirect(orgSelection);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
