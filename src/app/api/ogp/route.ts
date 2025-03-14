import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";
import * as cheerio from 'cheerio';
interface OgpResult {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url?: string } | { url?: string }[];
  ogSiteName?: string;
  favicon?: string;
}

/** Fallback用にHTMLを解析する関数 */
async function fallbackFetchMeta(url: string) {
  try {
  const res = await fetch(url, {
      headers: {
        'User-Agent': 'bot',
      },
    });
    if (!res.ok) throw new Error("Fallback fetch failed");
    const html = await res.text();
    const $ = cheerio.load(html);

    // <title> か meta[name="title"] などを拾う
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="title"]').attr("content") ||
      "";

    // meta[property="og:description"] or meta[name="description"]
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    // og:image or fallback
    const image =
      $('meta[property="og:image"]').attr("content") ||
      "";

    // 何かサイト名が取れそうなら
    const siteName =
      $('meta[property="og:site_name"]').attr("content") ||
      ""; // 必要に応じて

    // faviconは <link rel="icon" /> or <link rel="shortcut icon" /> 等を拾う
    // 例:
    const favicon =
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="icon"]').attr("href") ||
      "";

    return { title, description, image, siteName, favicon };
  } catch {
    // fallback自体も失敗したら 空データに
    return { title: "", description: "", image: "", siteName: "", favicon: "" };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required." },
      { status: 400 }
    );
  }

  try {
    // 1. まず open-graph-scraper を試す
    const options = {
      url,
      headers: {
        'User-Agent': 'bot',
      },
    };
    const { result } = (await ogs(options)) as { result: OgpResult };
    // ogs成功。ただしタグがなかった場合は result.ogTitle 等が空になる

    // OGPのtitle/description
    let finalTitle = result.ogTitle || "";
    let finalDesc = result.ogDescription || "";

    // 2. ogTitle も ogDescription も取れなかったら fallback
    if (!finalTitle && !finalDesc) {
      const fallback = await fallbackFetchMeta(url);
      finalTitle = fallback.title;
      finalDesc = fallback.description;
      // 画像も fallback
      let fallbackImage = fallback.image;
      // siteName なども fallback
      const fallbackSiteName = fallback.siteName;
      const fallbackFavicon = fallback.favicon;

      return NextResponse.json({
        title: finalTitle,
        description: finalDesc,
        image: fallbackImage,
        siteName: fallbackSiteName,
        favicon: fallbackFavicon,
      });
    }

    // 画像
    let image = "";
    if (result.ogImage) {
      if (Array.isArray(result.ogImage)) {
        image = result.ogImage[0].url || "";
      } else {
        image = result.ogImage.url || "";
      }
    }

    const siteName = result.ogSiteName || "";
    const favicon = result.favicon || "";

    return NextResponse.json({
      title: finalTitle,
      description: finalDesc,
      image,
      siteName,
      favicon,
    });
  } catch (error) {
    console.error("OGP取得エラー:", error);
    // 3. ogs 自体が例外で落ちた場合 → fallback
    const fallback = await fallbackFetchMeta(url);
    // fallback でも取得できなければ空文字が入る
    return NextResponse.json(
      {
        title: fallback.title,
        description: fallback.description,
        image: fallback.image,
        siteName: fallback.siteName,
        favicon: fallback.favicon,
      },
      { status: 200 }
    );
  }
}
