import { NextResponse } from "next/server";

// List of aggressive bot user-agents to block
const BLOCKED_BOTS = [
  "AdsBot-Google",
  "Amazonbot",
  "ClaudeBot",
  "GPTBot",
  "Omgilibot",
  "CCBot",
  "YandexBot",
  "Baiduspider",
];

export function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";
  
  // 1. Block known aggressive AI scrapers and non-essential bots
  const isBadBot = BLOCKED_BOTS.some((bot) => userAgent.includes(bot));
  
  if (isBadBot) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // 2. Allow Googlebot and Bingbot (Standard SEO) but ignore the rest
  // This keeps your SEO healthy while reducing "noise"
  
  return NextResponse.next();
}

// Only run middleware on relevant paths to keep it lightweight
export const config = {
  matcher: [
    "/movie/:path*",
    "/series/:path*",
    "/person/:path*",
    "/api/:path*",
    "/discover/:path*",
  ],
};