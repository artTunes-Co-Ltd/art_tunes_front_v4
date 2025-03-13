/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./displayStyles.module.css";
import type { NodeItem } from "@/types/Node";

interface OgpData {
  image: string;
  siteName: string;
  favicon: string;
  summary: string;
}

interface WebDetailProps {
  node: NodeItem; // displayDataType = "web"
}

export default function WebDetail({ node }: WebDetailProps) {
  const [ogpData, setOgpData] = useState<OgpData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchOgp() {
      try {
        const res = await fetch(`/api/ogp?url=${encodeURIComponent(node.link)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch OGP data");
        }
        const data = await res.json();
        setOgpData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    if (node.link) {
      fetchOgp();
    }
  }, [node.link]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!ogpData) {
    return <div>Loading OGP data...</div>;
  }

  return (
    // 外枠: display: flex; width: 480px; padding: 24px 16px 0px 16px; align-items: center; gap: 10px;
    <div
      className="
        flex
        w-[480px]
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
        {/* ここにPDFの詳細を表示する。例: node.name, node.description, node.link など */}
        <h2 className={styles.nodeName}>
          {node.name}1
        </h2>

        <p className={styles.nodeDescription}>
          {node.description}
        </p>
        {/* OGP画像 */}
        <div
      className="
        relative
        w-[448px] h-[235px]
        rounded-[12px]
        border border-[#FCFAF2]
        overflow-hidden
      "
      style={{
        background: `url(${ogpData.image}) center / cover no-repeat, #E8E7E4`,
      }}
    />
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
        {/* サイト名 (1行省略, Figma: Title Small 15px / 24) */}
        <h2
          className="
            text-[#1C1C1C]
            text-[15px]
            font-bold
            leading-[24px]
            tracking-[0.09px]
            overflow-hidden
            whitespace-nowrap
            text-ellipsis
          "
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            height: "20px",
          }}
        >
          {ogpData.siteName || node.name}
        </h2>

        {/* URL (Figma: Body Small 11px / 16, color #828282) */}
        <a
          href={node.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-1
            text-[#828282]
            text-[11px]
            font-normal
            leading-[16px]
            tracking-[0.03px]
            overflow-hidden
            whitespace-nowrap
            text-ellipsis
          "
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            height: "16px",
          }}
        >
          {node.link}
        </a>
        </div>
          {/* Favicon (32px円形) */}
          <div
            className={styles.Favicon}
            style={{
              background: ogpData.favicon
                ? `url(${ogpData.favicon}) center / cover no-repeat, #E8E7E4`
                : '#E8E7E4', // Faviconが無い場合は灰色
            }}
          />
</div>
<div className="flex items-start gap-2 mt-2">
          {/* 概要文 (Figma: Body Medium 13px / 20, color #1C1C1C) */}
          <p className="
            text-[#1C1C1C]
            text-[13px]
            leading-[20px]
            tracking-[0.06px]
            font-normal
          ">
            {ogpData.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
