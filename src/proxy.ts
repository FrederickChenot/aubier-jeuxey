import { withAuth } from "next-auth/middleware";

// withAuth exempts automatically the configured pages.signIn URL (/admin/login)
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Matches /admin AND /admin/* — withAuth lets /admin/login through automatically
  matcher: ["/admin/:path*"],
};
