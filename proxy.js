import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });

  // If supabase isn't configured, only block /admin (except login) with a redirect to /
  if (!url || !key) {
    const path = request.nextUrl.pathname;
    if (path.startsWith("/admin") && path !== "/admin/login") {
      const u = request.nextUrl.clone();
      u.pathname = "/admin/login";
      return NextResponse.redirect(u);
    }
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && path !== "/admin/login" && !user) {
    const u = request.nextUrl.clone();
    u.pathname = "/admin/login";
    return NextResponse.redirect(u);
  }

  if (path === "/admin/login" && user) {
    const u = request.nextUrl.clone();
    u.pathname = "/admin";
    return NextResponse.redirect(u);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
