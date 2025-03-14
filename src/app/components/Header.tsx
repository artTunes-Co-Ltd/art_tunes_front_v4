"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    // 全幅に背景を敷き、内側コンテナを 1280px に制限
    <header className="w-full bg-[#FFFFFB]">
      <div
        className="
          flex
          items-center
          justify-between
          max-w-[1280px]
          py-[12px]
          px-[16px]
          mx-auto
        "
      >
        {/* 左側：ロゴ画像 */}
        <div>
          <Image
            src="/icons/aT_LogoType.svg"
            alt="artTunes Logo"
            width={113}
            height={24}
          />
        </div>

        {/* 右側：ボタン＆設定アイコン */}
        <div className="flex items-center gap-4">
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
          {/* 一旦設定は非表示
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
          </Link> */}
        </div>
      </div>
    </header>
  );
}
