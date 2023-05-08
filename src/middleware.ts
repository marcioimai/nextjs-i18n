import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en-US", "pt-BR", "es-ES"];
const defaultLocale = "en-US";

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  console.log("accept-language", request.headers.get("accept-language"));
  const acceptLanguage = `${request.headers.get("accept-language")}`;
  const negotiator = new Negotiator({
    headers: {
      ["accept-language"]: acceptLanguage,
    },
  });
  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
