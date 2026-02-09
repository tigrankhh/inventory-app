import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ℹ️ Этот лог покажет, какой именно путь пытается открыть Cloudflare
  console.log(`ℹ️ [Middleware Hit] URL: ${request.url} | Path: ${request.nextUrl.pathname}`);
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
