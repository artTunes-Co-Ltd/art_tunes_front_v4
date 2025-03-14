"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import ProfileCard from "./ProfileCard";
import ProfileDetailCard from "./ProfileDetailCard";
import NodeList from "./NodeList";
import SourcesPanel from "./SourcesPanel";
import NodeDetail from "./NodeDetail";
import type { User } from "@/types/User";
import type { NodeItem } from "@/types/Node";
import type { Source } from "@/types/Source";


interface UserPageClientProps {
    user: User;
    nodes: NodeItem[];
    sources: Source[];
  }

export default function UserPageClient({ user, nodes, sources }: UserPageClientProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [showSources, setShowSources] = useState(false);


  return (
    <div className="relative min-h-screen w-full bg-[#FFFFFB]">
      {/* ヘッダーもここにまとめる */}
      <Header />
      {/* メインコンテンツ */}
      <main className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 py-9">
      {/* プロフィールカード */}
      <div className="max-w-[448px] w-full">
      <ProfileCard user={user} onDetailClick={() => setShowDetail(true)} />
      </div>

      {/* ノード一覧 */}
      <div className="max-w-[448px] w-full mt-8">
      <NodeList nodes={nodes} />
      </div>
      {/* ↓ ノード一覧の下に、各ノードの詳細を表示 */}
      <div className="max-w-[480px] w-full mt-8">
        {nodes.map((node) => (
          <NodeDetail key={node.id} node={node} />
        ))}
      </div>
      </main>

      {/* 詳細パネル */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex">
          {/* オーバーレイ */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetail(false)}
          />
          {/* 右パネル */}
          <div className="ml-auto relative bg-[#FFFFFB] w-full max-w-[384px] h-auto overflow-y-auto shadow-[-12px_0px_24px_0px_rgba(0,0,0,0.08)]">
            <ProfileDetailCard
              user={user}
              onClose={() => setShowDetail(false)}
              // ソース一覧を開くときは、詳細パネルを閉じてからソース一覧を開く
              onOpenSources={() => {
                setShowDetail(false); // ① まず詳細パネルを閉じる
                setShowSources(true); // ② ソース一覧を開く
              }}
            />
          </div>
        </div>
      )}

      {/* ソース一覧パネル */}
      {showSources && (
        <div className="fixed inset-0 z-60 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSources(false)}
          />
          <div className="ml-auto relative bg-[#FFFFFB] w-[384px] h-auto overflow-y-auto shadow-[-12px_0px_24px_0px_rgba(0,0,0,0.08)]">
            <SourcesPanel
              sources={sources}
              onClose={() => setShowSources(false)}
            />
          </div>
        </div>
      )}
    </div>
)}
