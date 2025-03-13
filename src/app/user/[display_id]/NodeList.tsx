"use client";
import Image from "next/image";
import type { NodeItem } from "@/types/Node";

// interface NodeListProps {
//   nodes: NodeItem[];
// }

export default function NodeList({ nodes }: { nodes: NodeItem[] }) {
    return (
      <div className="w-full">
        {/* タイトルボックス */}
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/icons/Node.svg"
            alt="ノードアイコン"
            width={24}
            height={24}
          />
          <p
            className="
              text-[#1C1C1C]
              text-[21px]
              font-bold
              leading-[36px]
              tracking-[0.18px]
            "
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ノード
          </p>
        </div>
  
        {/* ノードが0件かどうか */}
        {(!nodes || nodes.length === 0) ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <Image
              src="/icons/Node.svg"
              alt="ノードがありません"
              width={40}
              height={40}
            />
            <p className="text-gray-600 text-sm font-bold">連携しているノードがありません</p>
            <p className="text-gray-400 text-xs max-w-[320px] text-center whitespace-normal leading-normal">
              連携したいノードを追加すると、そのノードから取得した情報が表示されるようになります。
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {nodes.map((node) => (
              <NodeItemCard key={node.id} node={node} />
            ))}
          </div>
        )}
      </div>
    );
  }

// function NoNodes() {
//   return (
//     <div className="flex flex-col items-center gap-2 mt-2 w-full">
//       <Image
//         src="/icons/Node.svg"
//         alt="ノードがありません"
//         width={32}
//         height={32}
//       />
//       <p className="text-gray-600 text-sm font-bold">連携しているノードがありません</p>
//       <p
//             className="
//               text-gray-400 text-xs
//               max-w-[400px]
//               text-center
//               whitespace-normal
//               leading-normal
//             "
//           >
//         連携したいノードを追加すると、そのノードから取得した情報が表示されるようになります
//       </p>
//     </div>
//   );
// }

// function NodeListContent({ nodes }: { nodes: NodeItem[] }) {
//   return (
//     <div className="flex flex-col gap-2 mt-2">
//       {nodes.map((node) => (
//         <NodeItemCard key={node.id} node={node} />
//       ))}
//     </div>
//   );
// }

function NodeItemCard({ node }: { node: NodeItem }) {
  const iconPath = getNodeIcon(node.displayDataType);

  return (
    <a
      href={node.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-start gap-2
        p-3
        border border-[#E8E7E4]
        rounded
        hover:bg-gray-50
        cursor-pointer
      "
    >
      {/* アイコン */}
      <Image src={iconPath} alt={node.displayDataType} width={32} height={32} />
      {/* テキスト部分 */}
      <div className="flex flex-col">
      <p
          className="
            text-[#1C1C1C]
            text-[13px]
            font-bold
            leading-[20px]
            tracking-[0.06px]
            overflow-hidden
            text-ellipsis
            // 以下はインラインスタイルで -webkit-line-clamp
          "
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
        >
          {node.name}
        </p>
        {/* Description (2行省略) */}
        <p
          className="
            mt-1
            text-[#1C1C1C]
            text-[11px]
            font-normal
            leading-[16px]
            tracking-[0.03px]
            overflow-hidden
            text-ellipsis
          "
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {node.description}
        </p>
      </div>
    </a>
  );
}

function getNodeIcon(type: string): string {
  switch (type) {
    case "web":
      return "/icons/Web.svg";
    case "pdf":
      return "/icons/PDF.svg";
    case "instagram":
      return "/icons/Instagram.svg";
    case "threads":
      return "/icons/Threads.svg";
    case "youtube":
      return "/icons/Youtube.svg";
    default:
      return "/icons/Web.svg"; // fallback
  }
}
