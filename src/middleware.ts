import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookie = req.cookies.get('JSESSIONID'); // 서버에서 세션 쿠키 읽기

  const isAuth = Boolean(cookie);

  if (!isAuth && !req.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // 보호할 페이지들
};
