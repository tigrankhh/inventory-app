import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Если зашли на корень, просто разрешаем просмотр
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next(); 
  }

  // 2. ДЛЯ ВСЕХ ОСТАЛЬНЫХ СТРАНИЦ тоже разрешаем (чтобы не было 404)
  return NextResponse.next();
}

// Указываем, какие пути должен обрабатывать этот файл
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
