"use client";
import { useCallback } from "react";
import Image from "next/image";

interface User {
  displayID: string;
  displayName: string;
  icon?: string;
  headerImageUrl: string;
  category: string;
  role: string;
  title: string;
  profile?: string;
  eyeCatches?: string[];
}

// 12桁の displayID を xxxx-xxxx-xxxx に変換
function formatDisplayId(id: string) {
  if (id.length !== 12) return id;
  return id.slice(0, 4) + "-" + id.slice(4, 8) + "-" + id.slice(8);
}

interface ProfileCardProps {
  user: User;
  onDetailClick?: () => void; // 追加
}

export default function ProfileCard({ user, onDetailClick }: ProfileCardProps) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(user.displayID);
    alert("コピーしました: " + user.displayID);
  }, [user.displayID]);

  return (
    <div
      className="
        flex flex-col
        px-[16px] pt-[16px] pb-[8px]
        rounded-[16px]
        border border-[#FCFAF2]
        bg-[#FFFFFB]
        shadow-[0_12px_24px_0_rgba(0,0,0,0.08)]
      "
    >
      {/* 上段: 左にアイコン、右側にユーザー情報と右上ロゴ */}
      <div className="flex items-start gap-3 w-full">
        {/* プロフィールアイコン */}
        <div className="border border-[#FCFAF2] rounded-full overflow-hidden w-[68px] h-[68px] relative">
          <Image
            src={user.icon || "/icons/Avatar.svg"}
            alt={`${user.displayName}のアイコン`}
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* 右側: ユーザー情報と右上ロゴ */}
        <div className="flex-1 flex justify-between items-start">
          <div>
            {/* ユーザー名 */}
            <div className="text-[#1C1C1C] text-[15px] font-bold leading-[24px] tracking-[0.09px]">
              {user.displayName || "ユーザー名"}
            </div>
            {/* @user_id 
            <div className="mt-1 text-[11px] text-[#828282]">
              @user_id
            </div>*/}
            {/* display_id + コピーアイコン */}
            <div className="flex items-center gap-2 mt-2">
              <div className="text-[#1C1C1C] text-[13px] leading-[20px] tracking-[0.06px]">
                {formatDisplayId(user.displayID)}
              </div>
              <button
                onClick={handleCopy}
                className="
                  flex items-center justify-center
                  w-[24px] h-[24px]
                  rounded-full
                  border border-[#E8E7E4]
                  hover:opacity-80
                "
              >
                <Image
                  src="/icons/Copy.svg"
                  alt="Copy"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
          {/* 右上: aロゴ (Vector.svg) */}
          <Image
            src="/icons/Vector.svg"
            alt="Vectorロゴ"
            width={20}
            height={20}
            className="shrink-0"
          />
        </div>
      </div>
      {/* ← ここで上段（flex items-start gap-3 w-full）の閉じタグを追加 */}
      
      {/* タイトル */}
      {user.title && (
        <p
          className="
            text-[#1C1C1C]
            text-[11px]
            font-bold
            leading-[16px]
            tracking-[0.03px]
            mt-1
          "
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {user.title}
        </p>
      )}

{/* ▼ プロフィール文 + 詳細ボタンを横並び */}
{user.profile ? (
  // プロフィール文がある場合のみ
  <div className="flex items-center gap-2 mt-3 w-full">
    <p
      className="
        text-[11px]
        leading-[16px]
        tracking-[0.03px]
        text-[#1C1C1C]
        font-normal
        flex-1
        overflow-hidden
        text-ellipsis
        whitespace-normal
      "
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 4,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {user.profile}
    </p>

    <button
      onClick={onDetailClick}
      className="
        flex items-center justify-center
        h-[24px] px-3
        text-[13px] font-bold leading-[20px]
        tracking-[0.06px] text-[#1C1C1C]
        border border-[#E8E7E4]
        rounded-full
        hover:opacity-80
        ml-auto
      "
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      詳細
    </button>
  </div>
) : (
  // プロフィール文がない場合
  <div className="flex items-center gap-1 mt-3">
    <Image
      src="/icons/Warning.svg"
      alt="情報がありません"
      width={16}
      height={16}
    />
    <p
              className="
              overflow-hidden       /* overflow: hidden; */
              whitespace-nowrap     /* text-overflow: ellipsis に必要 */
              text-ellipsis         /* text-overflow: ellipsis; Tailwind 3.0+ */
              text-[#828282]        /* color: #828282 */
              text-[11px]           /* font-size: 11px */
              font-normal           /* font-weight: 400 */
              leading-[16px]        /* line-height: 16px */
              tracking-[0.03px]     /* letter-spacing: 0.03px */
            "
              style={{ fontFamily: 'Inter, sans-serif' }}>
      紹介文の情報がありません
    </p>
  </div>
)}


      {/* eyeCatches */}
      {user.eyeCatches && user.eyeCatches.length > 0 ? (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {user.eyeCatches.map((url, i) => (
            <div
              key={i}
              className="
                relative
                flex items-center
                w-full
                w-[80px]
                aspect-square
                border border-[#FCFAF2]
                rounded-[8px]
                overflow-hidden
              "
            >
              <Image
                src={url}
                alt={`eyeCatch_${i}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-gray-400 mt-4">
          <Image
            src="/icons/Warning.svg"
            alt="情報がありません"
            width={16}
            height={16}
          />
          <p
              className="
              overflow-hidden       /* overflow: hidden; */
              whitespace-nowrap     /* text-overflow: ellipsis に必要 */
              text-ellipsis         /* text-overflow: ellipsis; Tailwind 3.0+ */
              text-[#828282]        /* color: #828282 */
              text-[11px]           /* font-size: 11px */
              font-normal           /* font-weight: 400 */
              leading-[16px]        /* line-height: 16px */
              tracking-[0.03px]     /* letter-spacing: 0.03px */
            "
              style={{ fontFamily: 'Inter, sans-serif' }}>プレビュー画像の情報がありません</p>
        </div>
      )}
    </div>
  );
}
