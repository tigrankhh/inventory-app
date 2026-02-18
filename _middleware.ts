import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Если юзер на главной, просто пропускаем его или делаем редирект на /login ПРАВИЛЬНО
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next(); 
  }
}
