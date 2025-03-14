"use client";
import Image from "next/image";
import type { Source } from "@/types/Source";

interface SourcesPanelProps {
  sources: Source[];
  onClose: () => void;
}

export default function SourcesPanel({ sources, onClose }: SourcesPanelProps) {
  return (
    <div>
      {/* ヘッダー: 閉じるボタン (左上) */}
      <div className="flex justify-start p-4">
        <CloseButton onClose={onClose} />
      </div>

      <div className="flex flex-col px-4 pb-4 gap-4">
        {/* タイトル: source.svg +「ソース」 */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/Source.svg"
            alt="ソースアイコン"
            width={32}
            height={32}
          />
          <p
            className="
              text-[#1C1C1C]
              text-[21px]
              font-bold
              leading-[36px]
              tracking-[0.18px]
            "
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ソース
          </p>
        </div>

        {(!sources || sources.length === 0) ? (
          <EmptySources onClose={onClose} />
        ) : (
          <SourceList sources={sources} />
        )}
      </div>
    </div>
  );
}

/** 閉じるボタン */
function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="
        flex items-center gap-1
        px-3 py-1
        border border-[#E8E7E4]
        rounded-full
        hover:bg-gray-100
      "
    >
      <Image
        src="/icons/x.svg"
        alt="閉じる"
        width={12}
        height={12}
      />
      <span
        className="
          text-[#1C1C1C]
          text-[13px]
          font-bold
          leading-[20px]
          tracking-[0.06px]
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        閉じる
      </span>
    </button>
  );
}

/** ソースが無い場合 */
function EmptySources({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 text-center">
            <p
        className="
          text-[#1C1C1C]
          font-bold
          text-[15px]
          leading-[24px]
          tracking-[0.09px]
        "
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >ソースがありません</p>
      <p
        className="
          text-[#1C1C1C]
          text-[13px]
          font-normal
          leading-[20px]
          tracking-[0.06px]
          whitespace-normal
        "
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
       関連するソースがある場合は、こちらに表示されます。
      </p>
      {/* OKボタン */}
      <button
        onClick={onClose}
        className="
          w-full
          flex items-center justify-center gap-2
          px-[24px] py-[10px]
          border border-[#E8E7E4]
          rounded-[32px]
          hover:bg-gray-100
          mt-2
        "
      >
        <span
          className="
            text-[#1C1C1C]
            text-[15px]
            font-bold
            leading-[24px]
            tracking-[0.09px]
          "
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          OK
        </span>
      </button>
    </div>
  );
}

/** ソース一覧がある場合 */
function SourceList({ sources }: { sources: Source[] }) {
  return (
    <div className="flex flex-col">
      {sources.map((src, i) => (
        <SourceItemCard
          key={src.id}
          source={src}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}
/** ソース1件分 */
function SourceItemCard({
  source,
  isFirst,
}: {
  source: Source;
  isFirst?: boolean; // 最初の要素は区切り線を付けない等の制御に使う
}) {
  return (
    <a
  href={source.url}
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex flex-col
    hover:bg-gray-50
    cursor-pointer
  "
>
    <div
      className={`
        flex flex-col
        gap-[12px]
        px-[16px] py-[12px]
        ${!isFirst ? "border-t border-[#E8E7E4]" : ""}
      `}
    >
      {/* タイトル (line-clamp:1) */}
      <div
        className="
          text-[#1C1C1C]
          text-[15px]
          font-bold
          leading-[24px]
          tracking-[0.09px]
          overflow-hidden
          text-ellipsis
          line-clamp-1
        "
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {source.title}
      </div>

      {/* Description (line-clamp:2) */}
      <div
        className="
          text-[#1C1C1C]
          text-[13px]
          font-normal
          leading-[20px]
          tracking-[0.06px]
          overflow-hidden
          gap-[12px]
          text-ellipsis
          line-clamp-2
        "
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {source.description}
      </div>
      <div
      className="
        flex
        justify-between
        items-start   /* 上揃え (縦方向) */
        w-full
        h-[36px]      /* コンテナの高さを36pxで固定 */
      "
    >
      {/* 左側: web_title + url */}
      <div className="flex flex-col h-full max-w-[280px]">
        {/* web_title (高さ20px) */}
        <p
          className="
            text-[#1C1C1C]
            text-[13px]
            font-bold
            leading-[20px]
            tracking-[0.06px]
            overflow-hidden
            text-ellipsis
            line-clamp-1
          "
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            fontFamily: "Inter, sans-serif",
            height: "20px", // Figma上の高さ20px
          }}
        >
          {source.web_title}
        </p>

        {/* url (高さ16px) */}
        <p
          className="
            text-[#828282]
            text-[11px]
            font-normal
            leading-[16px]
            tracking-[0.03px]
            overflow-hidden
            text-ellipsis
            break-all
            line-clamp-1
          "
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            fontFamily: "Inter, sans-serif",
            height: "16px",
          }}
        >
          {source.url}
        </p>
      </div>
      <div 
  className="w-[32px] h-[32px] rounded-[32px] overflow-hidden border border-[#E8E7E4]"
  style={{
    backgroundImage: "url('/icons/Source.svg')",
    backgroundColor: "lightgray",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
/>

    </div>
    </div></a>
  );
}
