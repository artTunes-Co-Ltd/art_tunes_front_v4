/* eslint-disable @typescript-eslint/no-unused-vars */
import UserPageClient from "./UserPageClient";
import { Metadata } from "next";
import type { User } from "@/types/User";
import type { NodeItem } from "@/types/Node";
import type { Source } from "@/types/Source";

// サーバーサイドでユーザーデータを取得する関数
async function getUserByDisplayID(displayID: string): Promise<User | null> {
  const res = await fetch(`https://v4-stg-api.art-tunes.art/users/display/${displayID}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    uid: data.uid,
    displayID: data.display_id,
    displayName: data.display_name,
    icon: data.icon,
    headerImageUrl: data.header_image_url,
    category: data.category,
    role: data.role,
    title: data.title,
    profile: data.profile,
    eyeCatches: data.eye_catches || [],
  };
}

// サーバーサイドでノードを取得する関数
// async function getNodesByUserUID(uid: string): Promise<NodeItem[]> {
//   const res = await fetch(`https://v4-stg-api.art-tunes.art/nodes/${uid}`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const data = await res.json();
//   // data が配列かどうかを確認
//   if (!Array.isArray(data)) {
//     // 配列でない場合は空配列を返す
//     return [];
//   }
//   return data.map((item: any) => ({
//     id: item.id,
//     sort: item.sort,
//     name: item.name,
//     description: item.description,
//     link: item.link,
//     displayDataType: item.display_data_type,
//   }));
// }
async function getNodesByUserUID(uid: string): Promise<NodeItem[]> { //Test用
  // 実際のAPI呼び出しの代わりに、全てのDisplayDataTypeを持つノードを返す
  return [
    {
      id: 1,
      sort: 1,
      name: "Web Node",
      description: "A sample web node",
      link: "https://qiita.com/GIFCat/items/d79e077499d7c520eea7",
      displayDataType: "web",
    },
    {
      id: 2,
      sort: 2,
      name: "PDF Node",
      description: "PDF node description",
      link: "https://art-tunes-v3-stg-bucket.s3.us-west-2.amazonaws.com/uploads/original/065c9c6cf364477e93f222872f4cc432.pdf",
      displayDataType: "pdf",
    },
    {
      id: 3,
      sort: 3,
      name: "Instagram Node",
      description: "Instagram node description",
      link: "https://instagram.com/sample",
      displayDataType: "instagram",
    },
    {
      id: 4,
      sort: 4,
      name: "Threads Node",
      description: "Threads node description",
      link: "https://threads.net/sample",
      displayDataType: "threads",
    },
    {
      id: 5,
      sort: 5,
      name: "YouTube Node",
      description: "YouTube node description",
      link: "UCq3Wpi10SyZkzVeS7vzB5Lw",
      displayDataType: "youtube",
    },
    {
      id: 6,
      sort: 6,
      name: "Web Node2",
      description: "A sample web node2",
      link: "https://qiita.com/Enuwbt/items/5b822020e575c5250606",
      displayDataType: "web",
    },
  ];
}

// async function getSourcesByUserUID(uid: string): Promise<Source[]> {
//   const res = await fetch(`https://v4-stg-api.art-tunes.art/sources/${uid}`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const data = await res.json(); // data is SourceListResponse
//   return data.map((item: any) => ({
//     id: item.id,
//     title: item.title,
//     description: item.description,
//     webTitle: item.web_title,
//     url: item.url,
//     createdAt: item.created_at,
//     updatedAt: item.updated_at,
//     deletedAt: item.deleted_at,
//   }));
// }
async function getSourcesByUserUID(uid: string): Promise<Source[]> { //test用
  return [
    {
      id: 1,
      title: "ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1ダミーソース1",
      description: "テスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソーステスト用のソース",
      web_title: "Sample Web Title 1",
      url: "https://example.com/source1",
      createdAt: "2025-03-13T10:00:00Z",
      updatedAt: "2025-03-13T11:00:00Z",
      deletedAt: null,
    },
    {
      id: 2,
      title: "ダミーソース2",
      description: "別のテスト用ソーステスト用のソーステスト用のソーステスト用のソーステスト用のソース",
      web_title: "Sample Web Title 2Sample Web Title 2Sample Web Title 2Sample Web Title 2Sample Web Title 2",
      url: "https://example.com/source2https://example.com/source2https://example.com/source2https://example.com/source2",
      createdAt: "2025-03-14T10:00:00Z",
      updatedAt: "2025-03-14T11:00:00Z",
      deletedAt: null,
    },
    // 必要に応じて追加
  ];
}

// 動的メタデータ
export async function generateMetadata({ params }: { params: { display_id: string } }): Promise<Metadata> {
  const user = await getUserByDisplayID(params.display_id);
  if (!user) {
    return {
      title: "ユーザーが見つかりません",
      robots: {
        index: false,
      },
    };
  }
  return {
    // 例: "Taro / artTunes"
    title: `${user.displayName} / artTunes`,
    // noindex を付けたい場合
    robots: {
      index: false,
    },
  };
}


// ページコンポーネントの props 型をインラインで定義する
export default async function Page({ params }: { params: { display_id: string } }) {
  const user = await getUserByDisplayID(params.display_id);
  if (!user) {
    return <div className="p-8">ユーザーが見つかりませんでした。</div>;
  }

  // ノード一覧を取得
  const nodes = await getNodesByUserUID(user.uid);
  // ソース一覧を取得
  const sources = await getSourcesByUserUID(user.uid);


  // SSR で取得した user をクライアントコンポーネントに渡す
  return  <UserPageClient user={user} nodes={nodes} sources={sources} />;
}