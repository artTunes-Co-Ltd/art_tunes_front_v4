/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./displayStyles.module.css";
import type { NodeItem } from "@/types/Node";
import { getThumbnailUrl } from "@/lib/getThumbnailUrl";
import { formatFileSize } from "@/lib/formatFileSize";

interface PdfDetailProps {
  node: NodeItem; // DisplayDataType = "pdf" のノードを想定
}

// interface PdfMetadataProps {
//   fileName: string;
//   contentLength: string; // APIから返ってきた文字列
// }

/** PDF メタ情報を表示するコンポーネント */
function PdfMetadata({ fileName, contentLength }: { fileName: string; contentLength: string }) {
  const formattedSize = formatFileSize(Number(contentLength));
  return (
    <div className="mt-4">
      <p
      className="
      text-[#1C1C1C]
      text-[13px]
      font-bold
      leading-[20px]
      tracking-[0.06px]
      font-sans
    ">
      {fileName}
      </p>
      <p
    className="
    text-[#828282]
    text-[11px]
    font-normal
    leading-[16px]
    tracking-[0.03px]
    font-sans
  "
      >
      {formattedSize}
      </p>
    </div>
  );
}

export default function PdfDetail({ node }: PdfDetailProps) {
  const thumbnailURL = getThumbnailUrl(node.link);
    // PDFのメタ情報をAPI経由で取得するための状態
  const [pdfMeta, setPdfMeta] = useState<{ fileName: string; contentLength: string } | null>(null);
  const [metaError, setMetaError] = useState<string>("");

  useEffect(() => {
    async function fetchPdfMeta() {
      try {
        const res = await fetch(`/api/pdf-metadata?url=${encodeURIComponent(node.link)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch PDF metadata");
        }
        const data = await res.json();
        setPdfMeta(data);
      } catch (err: any) {
        setMetaError(err.message);
      }
    }
    if (node.link) {
      fetchPdfMeta();
    }
  }, [node.link]);

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
          {node.name}
        </h2>

        <p className={styles.nodeDescription}>
          {node.description}
        </p>
        <div
  className="
    flex
    w-[448px] 
    h-[448px]
    p-[32px]       /* padding: 32px */
    flex-col
    justify-center
    items-center
    gap-[10px]
    bg-[#E8E7E4]   /* background: #E8E7E4 */
    rounded-[12px] /* 必要に応じて border-radius も */
  "
>
<a
  href={node.link}
  target="_blank"
  rel="noopener noreferrer"
>
        <div
      className="
  flex
  w-[384px]
  h-[288px]
  justify-center
  items-center
  flex-shrink-0
  rounded-[8px]
  bg-[#FFFFFB]
  shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)]
      "
      style={{
        // 背景にサムネイル画像を敷き詰める
        background: thumbnailURL
          ? `url(${thumbnailURL}) center / cover no-repeat`
          : "#E8E7E4", // 画像がない場合の背景色
      }}
    /></a></div>
        {/* PDFのメタ情報 */}
        <div className="flex flex-col justify-center items-start py-[12px]">
        {metaError ? (
          <div className="mt-2 text-red-500 text-sm">{metaError}</div>
        ) : pdfMeta ? (
          <PdfMetadata fileName={pdfMeta.fileName} contentLength={pdfMeta.contentLength} />
        ) : (
          <div className="mt-2 text-sm text-gray-500">Loading metadata...</div>
        )}
        </div>
      </div>
    </div>
  );
}
