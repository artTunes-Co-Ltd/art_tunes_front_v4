/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { formatSubscriberCount } from "@/lib/formatSubscriberCount";
import type { NodeItem } from "@/types/Node";

// 取得データの型
interface YoutubeData {
  channelName: string;
  customUrl: string;
  thumbnail: string;
  description: string;
  subscriberCount: string; // 例: "221万人"
  videoCount: string;      // 例: "241本"
  items: any[];            // 最新動画(3件)の配列（videos.list の snippet + statistics）
  error?: string;
}

interface YoutubeDetailProps {
  node: NodeItem; // displayDataType = "youtube"
}

export default function YoutubeDetail({ node }: YoutubeDetailProps) {
  const [data, setData] = useState<YoutubeData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchYouTubeData() {
      try {
        const channelId = node.link; // チャンネルIDが入っている想定
        const res = await fetch(`/api/youtube?channelId=${encodeURIComponent(channelId)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch YouTube data");
        }
        const json = await res.json();
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
    if (node.link) {
      fetchYouTubeData();
    }
  }, [node.link]);

  return (
    // 外枠: display: flex; width: 480px; padding: 24px 16px 0px 16px; align-items: center; gap: 10px;
    <div
      className="
        flex
        pt-[24px]
        px-[16px]
        pb-0
        items-center
        gap-[10px]
      "
    >
      {/* 内枠: display: flex; padding-top: 12px; flex-direction: column; align-items: flex-start; flex: 1 0 0; border-top: 1px solid var(--Gray-300, #E8E7E4); */}
      <div
        className="
          flex
          flex-col
          items-start
          flex-1
          border-t
          border-[#E8E7E4]
          pt-[12px]
        "
      >
      {/* タイトル部分 */}
      <h2 className="text-2xl font-bold text-[#1C1C1C]">Youtube</h2>
      <p className="text-sm text-gray-600">{node.description}</p>

      {/* エラー表示 */}
      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}

      {/* ローディング */}
      {!error && !data && (
        <div className="text-gray-500 mt-2">Loading...</div>
      )}

      {/* データ表示 */}
      {data && !error && (
        <div className="flex flex-col gap-4 mt-4">
          <ChannelHeader data={data} />
          <VideoList items={data.items} />
          <div className="flex justify-center mt-4">
            <button className="
              px-4 py-2
              text-sm
              rounded-full
              border border-gray-300
              hover:bg-gray-100
            ">
              32件の動画をすべて表示
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

/** チャンネル情報部分 */
function ChannelHeader({ data }: { data: YoutubeData }) {
  // 例: subscriberCount = "2750000" → 275万人
  const rawSub = Number(data.subscriberCount);
  const formattedSub = formatSubscriberCount(rawSub); // 「275万人」などに変換

  // videoCount + "本" 表記
  const formattedVideoCount = `${data.videoCount}`;
  // "275万人・513本" のように表示したい
  const subAndVideo = `${formattedSub}・${formattedVideoCount}本の動画`;

  return (
    <div className="
      flex flex-col gap-2
      p-4
      shadow-sm
    ">
      {/* 上部: サムネ + チャンネル名 + YouTubeを開くボタン */}
      <div className="flex items-start">
        <img
          src={data.thumbnail}
          alt="Channel Thumbnail"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="flex-1 flex flex-col">
          <p className="text-lg font-bold text-[#1C1C1C]">{data.channelName}</p>
          <p className="text-sm text-gray-500">{data.customUrl}</p>
        </div>
        <a
          href={`https://youtube.com/channel/${data.customUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            ml-auto
            px-4 py-2
            text-sm
            rounded-full
            border border-gray-300
            hover:bg-gray-100
          "
        >
          YouTubeを開く
        </a>
      </div>

      {/* チャンネル概要 */}
      <p className="text-sm text-gray-700 mt-1">
        {data.description}
      </p>

      {/* 登録者数・動画数 */}
      <p className="text-xs text-gray-500 mt-1">
        チャンネル登録者数 {subAndVideo}
      </p>
    </div>
  );
}

/** 最新動画リスト */
function VideoList({ items }: { items: any[] }) {
  if (!items.length) {
    return <div className="text-sm text-gray-500">動画がありません</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <VideoListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function formatShortViewCount(count: number): string {
  // 例: 19,607 → "1.9万回視聴"
  //     321,234 → "32.1万回視聴"
  //     9,999   → "9999回視聴"
  if (count >= 10_000) {
    const man = (count / 10_000).toFixed(1); // 小数1桁
    return `${man}万回視聴`;
  }
  return `${count}回視聴`;
}

/** 動画1件分 */
function VideoListItem({ item }: { item: any }) {
  const snippet = item.snippet;
  const statistics = item.statistics;
  const videoId = item.id;

  // サムネイル
  const thumb = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;
  // タイトル
  const title = snippet?.title || "No title";
  // 公開日時 → "○日前" "○ヶ月前" 等
  const publishedAt = snippet?.publishedAt ? new Date(snippet.publishedAt) : null;
  // date-fns で日本語ロケールを指定し、相対表記を生成
  const timeAgo = publishedAt
    ? formatDistanceToNow(publishedAt, { locale: ja }) + "前"
    : "N/A";

  // 再生数 → "○.x万回視聴"
  const rawViewCount = Number(statistics?.viewCount || 0);
  const displayViewCount = formatShortViewCount(rawViewCount);

  // 「○.x万回視聴・○日前」
  const subText = `${displayViewCount}・${timeAgo}`;

  // 動画リンク
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-start gap-2
        hover:bg-gray-50
        p-2
        rounded-md
      "
    >
      {/* サムネイル */}
      <img
        src={thumb}
        alt="video thumbnail"
        className="w-32 h-20 object-cover rounded-md"
      />
      <div className="flex flex-col">
        <p className="text-sm font-bold text-[#1C1C1C]">{title}</p>
        <p className="text-xs text-gray-500">{subText}</p>
      </div>
    </a>
  );
}
