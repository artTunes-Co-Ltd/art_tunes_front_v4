// src/app/api/pdf-metadata/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URL parameter is required." }, { status: 400 });
  }

  try {
    // HEAD リクエストを実行
    const headRes = await fetch(url, { method: "HEAD" });
    if (!headRes.ok) {
      return NextResponse.json({ error: "Failed to fetch PDF metadata." }, { status: 500 });
    }
    
    // Content-Length からファイルサイズを取得
    const contentLength = headRes.headers.get("Content-Length") || "";
    
    // Content-Disposition からファイル名を取得
    const contentDisposition = headRes.headers.get("Content-Disposition") || "";
    let fileName = "";
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (fileNameMatch) {
      fileName = fileNameMatch[1];
    } else {
      // ヘッダーにファイル名がなければ URL から抽出する例
      const parts = url.split("/");
      fileName = parts[parts.length - 1];
    }

    return NextResponse.json({ fileName, contentLength });
  } catch (error) {
    console.error("PDF metadata fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch PDF metadata." }, { status: 500 });
  }
}
