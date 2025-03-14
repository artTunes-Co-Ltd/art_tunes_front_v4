import React from "react";
import styles from "./displayStyles.module.css";
import type { NodeItem } from "@/types/Node";

interface ThreadsDetailProps {
  node: NodeItem; // DisplayDataType = "pdf" のノードを想定
}

export default function ThreadsDetail({ node }: ThreadsDetailProps) {
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
        {/* ここにPDFの詳細を表示する。例: node.name, node.description, node.link など */}
        <h2 className={styles.nodeName}>
          {node.name} 
        </h2>

        <p className={styles.nodeDescription}>
          {node.description}
        </p>

        {/* PDFのダウンロードリンクや表示リンク */}
        <a
          href={node.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-2
            text-blue-600
            underline
            text-[13px]
          "
        >
          {node.link}
        </a>
      </div>
    </div>
  );
}
