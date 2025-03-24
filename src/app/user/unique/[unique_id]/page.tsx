import UserPageClient from "../../[display_id]/UserPageClient";
import type { Metadata } from "next";
import type { User } from "@/types/User";
import type { NodeItem } from "@/types/Node";
import type { Source } from "@/types/Source";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v4-stg-api.art-tunes.art";

// ユーザー取得用
async function getUserByUniqueID(uniqueID: string): Promise<User | null> {
  const res = await fetch(`${API_BASE_URL}/users/unique/${uniqueID}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    uid: data.uid,
    displayID: data.display_id,
    displayName: data.display_name,
    icon: data.icon,
    headerImageUrl: data.header_image_url,
    ogpImageUrl: data.ogp_image_url,
    category: data.category,
    role: data.role,
    title: data.title,
    profile: data.profile,
    eyeCatches: data.eye_catches || [],
  };
}

// ノード取得用
async function getNodesByUserUID(uid: string): Promise<NodeItem[]> {
  const res = await fetch(`${API_BASE_URL}/nodes/${uid}`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) {
    return [];
  }
  // display_data_type を displayDataType に変換する
  return data.map((item: any) => ({
    id: item.id,
    sort: item.sort,
    name: item.name,
    description: item.description,
    link: item.link,
    displayDataType: item.display_data_type,
  }));
}

// ソース取得用
async function getSourcesByUserUID(uid: string): Promise<Source[]> {
  const res = await fetch(`${API_BASE_URL}/sources/${uid}`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// 動的メタデータを生成
export async function generateMetadata({
  params,
}: {
  params: { unique_id: string }
}): Promise<Metadata> {
  // paramsオブジェクト全体をawait
  const resolvedParams = await params;
  const uniqueId = resolvedParams.unique_id;
  
  const user = await getUserByUniqueID(uniqueId);
  
  if (!user) {
    return {
      title: "ユーザーが見つかりません",
      robots: { index: false },
    };
  }
  // タイトルは「ユーザー名（@ユニークID）| artTunes」
  const pageTitle = `${user.displayName} (@${uniqueId}) | artTunes`;
  // ページの説明文はユーザーの自己紹介文 (profile)
  const pageDescription = user.profile || "";

  const ogpImageUrl = user.ogpImageUrl || "/ogp_anonymous.png";

  return {
    title: pageTitle,
    openGraph: {
      type: "profile",            // ページの種類
      title: pageTitle,           // OGPタイトル
      description: pageDescription, // OGP説明文
      images: [
        {
          url: ogpImageUrl,      // バックエンドが返してくれた OGP画像URL
        },
      ],
    },
  };
}

// ページコンポーネント
export default async function Page({
  params,
}: {
  params: { unique_id: string }
}) {
  // paramsオブジェクト全体をawait
  const resolvedParams = await params;
  const uniqueId = resolvedParams.unique_id;
  
  const user = await getUserByUniqueID(uniqueId);
  
  if (!user) return <div className="p-8">ユーザーが見つかりませんでした。</div>;
  
  const nodes = await getNodesByUserUID(user.uid);
  const sources = await getSourcesByUserUID(user.uid);
  
  return <UserPageClient user={user} nodes={nodes} sources={sources} />;
}