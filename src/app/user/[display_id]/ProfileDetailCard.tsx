"use client";
import { useState } from "react";
import Image from "next/image";
import type { User } from "@/types/User";

interface ProfileDetailCardProps {
  user: User;
  onClose: () => void;
  onOpenSources: () => void;
}

export default function ProfileDetailCard({
  user,
  onClose,
  onOpenSources,
}: ProfileDetailCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = user.eyeCatches?.slice(0, 5) || [];

  // 4桁区切り
  const displayIDFormatted = formatDisplayId(user.displayID || "");

  // 画像切り替え
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const handleSetIndex = (i: number) => setCurrentIndex(i);

  return (
    <div>
      {/* ヘッダー: 左側に閉じるボタン */}
      <div className="flex justify-start p-4">
        <CloseButton onClose={onClose} />
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col px-4 pb-4 gap-2">
        {/* ユーザー情報 */}
        <div className="flex items-start gap-3">
          {/* アイコン */}
          <div className="border rounded-full overflow-hidden w-[68px] h-[68px] relative">
            <Image
              src={user.icon || "/icons/Avatar.svg"}
              alt={`${user.displayName}のアイコン`}
              fill
              className="object-cover"
            />
          </div>

          {/* テキスト部分 */}
          <div className="flex-1 flex flex-col gap-1">
            {/* ユーザ名 (1行省略) */}
            <div
              className="
                text-[#1C1C1C]
                font-bold
                text-[15px]
                leading-[24px]
                tracking-[0.09px]
                overflow-hidden
                text-ellipsis
              "
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {user.displayName || "ユーザー名"}
            </div>

            {/* @user_id
            <div
              className="
                text-[#828282]
                font-normal
                text-[11px]
                leading-[16px]
                tracking-[0.03px]
                overflow-hidden
                text-ellipsis
              "
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                fontFamily: "Inter, sans-serif",
              }}
            >
              @user_id
            </div> */}

            {/* display_id + コピー */}
            <div className="flex items-center gap-2">
              <div
                className="
                  text-[#1C1C1C]
                  font-normal
                  text-[13px]
                  leading-[20px]
                  tracking-[0.06px]
                "
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {displayIDFormatted}
              </div>
              <CopyButton displayID={user.displayID} />
            </div>

            {/* title */}
            {user.title && (
              <div
                className="
                  text-[#1C1C1C]
                  font-bold
                  text-[11px]
                  leading-[16px]
                  tracking-[0.03px]
                "
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {user.title}
              </div>
            )}
          </div>
        </div>

        {/* プロフィール文 (フル表示) */}
        <div
          className={`mt-2 font-normal text-[11px] leading-[16px] tracking-[0.03px] font-sans ${
            user.profile
              ? "text-[#1C1C1C] whitespace-pre-wrap"
              : "text-[#828282] overflow-hidden whitespace-nowrap text-ellipsis"
          }`}
        >
          {user.profile || "紹介文がありません"}
        </div>

        {/* 画像表示 */}
        {images.length > 0 ? (
          <div className="mt-4">
            <ImageCarousel
              images={images}
              currentIndex={currentIndex}
              handlePrev={handlePrev}
              handleNext={handleNext}
              setIndex={handleSetIndex}
              onOpenSources={onOpenSources}
            />
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
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              プレビュー画像の情報がありません
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** 閉じるボタン (左側) */
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
      {/* x.svg */}
      <Image src="/icons/x.svg" alt="閉じる" width={12} height={12} />
      {/* 「閉じる」テキスト: Figma指定 */}
      <span
        className="
          text-[#1C1C1C]
          text-[13px]
          font-bold
          leading-[20px]
          tracking-[0.06px]
        "
        style={{ fontFamily: "Inter, sans-serif", textAlign: "center" }}
      >
        閉じる
      </span>
    </button>
  );
}

/** 4桁区切り */
function formatDisplayId(id: string) {
  if (id.length !== 12) return id;
  return id.slice(0, 4) + "-" + id.slice(4, 8) + "-" + id.slice(8);
}

/** コピー */
function CopyButton({ displayID }: { displayID: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(displayID);
    alert(`コピーしました: ${displayID}`);
  };
  return (
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
      <Image src="/icons/Copy.svg" alt="Copy" width={16} height={16} />
    </button>
  );
}

/** 画像カルーセル (矢印とページインジケータを画像の下に表示) */
function ImageCarousel({
  images,
  currentIndex,
  handlePrev,
  handleNext,
  setIndex,
  onOpenSources,
}: {
  images: string[];
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  setIndex: (i: number) => void;
  onOpenSources: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* メイン画像 */}
      <div className="relative w-[352px] h-[352px] overflow-hidden rounded-[12px]">
        <Image
          key={currentIndex}
          src={images[currentIndex]}
          alt={`eyeCatch_${currentIndex}`}
          fill
          className="object-cover"
        />
      </div>

      {/* 矢印 + ページインジケータ を1行に */}
      <div className="flex items-center justify-between w-full max-w-[352px] px-4">
        {/* 左矢印 */}
        <button onClick={handlePrev} className="hover:opacity-80">
          <Image src="/icons/Arrow_Left.svg" alt="前へ" width={24} height={24} />
        </button>

        {/* ドット（ページインジケータ） */}
        <div className="flex items-center gap-[8px]">
          {images.map((_, i) => (
            <div key={i} onClick={() => setIndex(i)} className="cursor-pointer">
              {i === currentIndex ? (
                <Image
                  src="/icons/Page_Control.svg"
                  alt="現在のページ"
                  width={12}
                  height={12}
                />
              ) : (
                <Image src="/icons/o.svg" alt="他のページ" width={4} height={4.25} />
              )}
            </div>
          ))}
        </div>

        {/* 右矢印 */}
        <button onClick={handleNext} className="hover:opacity-80">
          <Image src="/icons/Arrow_Right.svg" alt="次へ" width={24} height={24} />
        </button>
      </div>

      {/* 下のテキスト部分 */}
      <div
        className="
          flex-1
          text-center
          text-[#1C1C1C]
          text-[11px]
          font-normal
          leading-[16px]
          tracking-[0.03px]
          mt-2
          px-4
        "
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        カード情報は自動補完されている場合があります。<br />
        詳しくは{" "}
        <span onClick={onOpenSources} className="cursor-pointer font-bold">
          ソース一覧
        </span>
        をご確認ください。
      </div>
    </div>
  );
}
