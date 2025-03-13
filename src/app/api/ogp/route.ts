// src/app/api/ogp/route.ts
import { NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

interface OgpResult {
  ogImage?: { url?: string } | { url?: string }[];
  ogSiteName?: string;
  ogDescription?: string;
  favicon?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required.' }, { status: 400 });
  }

  try {
    const { result } = (await ogs({ url })) as { result: OgpResult };

    let image = "";
    if (result.ogImage) {
      if (Array.isArray(result.ogImage)) {
        image = result.ogImage[0].url || "";
      } else {
        image = result.ogImage.url || "";
      }
    }
    const siteName = result.ogSiteName || "";
    const summary = result.ogDescription || "";
    const favicon = result.favicon || "";

    return NextResponse.json({
      image,
      siteName,
      favicon,
      summary,
    });
  } catch (error) {
    console.error("OGP取得エラー:", error);
    return NextResponse.json({ error: 'Failed to fetch OGP data.' }, { status: 500 });
  }
}
