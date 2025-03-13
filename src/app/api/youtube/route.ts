/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/youtube/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const apiKey = process.env.YOU_TUBE_API_KEY;

interface YoutubeResponse {
  channelName: string;
  customUrl: string;
  thumbnail: string;
  description: string;
  subscriberCount: string;
  videoCount: string;
  items: any[]; // 後述: snippet + statistics を統合した動画情報
}

export async function GET(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "YouTube API key is missing." }, { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const channelIdParam = searchParams.get("channelId");
    if (!channelIdParam) {
      return NextResponse.json({ error: "channelId parameter is required." }, { status: 400 });
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: apiKey,
    });

    // 1. チャンネル情報を取得
    let id: string[] | undefined;
    let forUsername: string | undefined;
    if (channelIdParam.startsWith("UC")) {
      id = [channelIdParam];
    } else {
      forUsername = channelIdParam;
    }

    let channelRes = await youtube.channels.list({
      part: ['id', 'contentDetails', 'snippet', 'statistics'],
      id,
      forUsername,
    });

    // 見つからなければ search で検索
    if (!channelRes.data.items || channelRes.data.items.length === 0) {
      const searchRes = await youtube.search.list({
        part: ['snippet'],
        q: forUsername,
        maxResults: 1,
        type: ['channel'],
      });
      if (!searchRes.data.items || searchRes.data.items.length === 0) {
        return NextResponse.json({ error: "No channel found." }, { status: 404 });
      }
      const foundChannelId = searchRes.data.items[0].id?.channelId;
      if (!foundChannelId) {
        return NextResponse.json({ error: "No channel ID found in search results." }, { status: 404 });
      }
      channelRes = await youtube.channels.list({
        part: ['id', 'contentDetails', 'snippet', 'statistics'],
        id: [foundChannelId],
      });
    }

    const channel = channelRes.data.items?.[0];
    if (!channel) {
      return NextResponse.json({ error: "Channel not found." }, { status: 404 });
    }

    // チャンネルの snippet, statistics をパース
    const snippet = channel.snippet;
    const statistics = channel.statistics;
    const channelName = snippet?.title ?? 'N/A';
    const customUrl = snippet?.customUrl ?? 'N/A';
    const thumbnail = snippet?.thumbnails?.high?.url ?? '';
    const description = snippet?.description ?? 'N/A';
    const subscriberCount = statistics?.subscriberCount?.toString() ?? '非公開';
    const videoCount = statistics?.videoCount?.toString() ?? 'N/A';

    // 2. アップロード再生リスト ID を取得
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return NextResponse.json({
        error: 'No uploads playlist found in channel.'
      }, { status: 404 });
    }

    // 3. playlistItems.list で最新 3 件の動画 ID を取得
    const playlistRes = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: uploadsPlaylistId,
      maxResults: 3,
    });
    const playlistItems = playlistRes.data.items || [];

    // 取得した動画IDをまとめる
    // snippet.resourceId.videoId に動画IDが入っている
    const videoIds: string[] = [];
    for (const item of playlistItems) {
      const vid = item.snippet?.resourceId?.videoId;
      if (vid) {
        videoIds.push(vid);
      }
    }

    // 4. videos.list で各動画の snippet + statistics を取得
    let mergedItems: any[] = [];
    if (videoIds.length > 0) {
      const videoRes = await youtube.videos.list({
        part: ['snippet', 'statistics'],
        id: videoIds,
      });
      const videoData = videoRes.data.items || [];

      // videoData[] と playlistItems[] を統合 or videoData[] のみを使う
      // ここでは videoData の snippet + statistics をそのまま返す例
      mergedItems = videoData.map(video => ({
        id: video.id,
        snippet: video.snippet,
        statistics: video.statistics,
      }));
    }

    // 返却用データ
    const responseData: YoutubeResponse = {
      channelName,
      customUrl,
      thumbnail,
      description,
      subscriberCount,
      videoCount,
      items: mergedItems,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json({ error: "Failed to fetch YouTube data." }, { status: 500 });
  }
}
