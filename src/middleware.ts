import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 「/@unique_id」の形でURLをマッチング
  const match = pathname.match(/^\/@([\w_-]+)$/);

  if (match) {
    const uniqueId = match[1];
    // 内部的に /user/unique/:unique_id にrewriteする
    return NextResponse.rewrite(new URL(`/user/unique/${uniqueId}`, request.url));
  }

  // それ以外はそのまま
  return NextResponse.next();
}

export const config = {
  matcher: '/@:unique_id*', // これで@付きURLをキャッチ可能にする
};
