"use client"; 
// App Router でクライアントコンポーネントとして使う場合の宣言

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
        flex 
        items-center 
        justify-between 
        w-[1280px] 
        py-[12px] 
        px-[16px] 
        mx-auto
      "
    >
      {/* 左側：ロゴ画像 */}
      <div>
        {/* 幅・高さはFigmaの寸法に合わせて調整してください */}
        <Image
          src="/icons/aT_LogoType.svg"
          alt="artTunes Logo"
          width={113}   // 例: Figmaの幅に合わせる
          height={24}   // 例: Figmaの高さに合わせる
          // fill でアスペクト比を保ったまま拡大/縮小も可能
        />
      </div>

      {/* 右側：ボタン＆設定アイコン */}
      <div className="flex items-center gap-4">
        {/* アプリを入手ボタン */}
        <Link
          href="https://art-tunes.art/ja/app"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-[8px]
            px-[12px] py-[6px]
            border border-[#E8E7E4]
            bg-[#1C1C1C]
            rounded-[32px]
            text-[#FFFFFB]
            text-[13px]
            font-bold
            leading-[20px]
            hover:opacity-80
            tracking-[0.06px]
          "
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          アプリを入手
        </Link>

        {/* 設定アイコン (円形の背景・ボーダーで囲む) */}
        <Link
          href="/settings"
          className="
            flex items-center justify-center
            w-[32px] h-[32px]
            rounded-full
            border border-[#E8E7E4]
            bg-[#FFFFFB]
            hover:opacity-80
          "
        >
          <Image
            src="/icons/Setting_Outline.svg"
            alt="設定"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </header>
  );
}
