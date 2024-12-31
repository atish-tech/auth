import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(
  (req: {
    nextUrl: { pathname: any };
    auth: any;
    url: string | URL | undefined;
  }) => {
    const currentPath = req.nextUrl.pathname;

    // Redirect to login page if user is not authenticated
    if (!req.auth) {
      return NextResponse.redirect(
        new URL(`/auth/login?next=${currentPath}`, req.url)
      );
    }
  }
);

// Manage list of protected routes
export const config = {
  matcher: ["/profile/:path*", "/another-protected-route/:path*"],
};
