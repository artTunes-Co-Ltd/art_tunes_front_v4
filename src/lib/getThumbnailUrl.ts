/**
 * PDF の URL からサムネイル画像の URL を生成する関数
 * @param pdfUrl - PDF の URL (例: http://S3-address/uploads/original/filename.pdf)
 * @returns サムネイル画像の URL (例: http://S3-address/uploads/thumbnail/filename.pdf.png)
 */
export function getThumbnailUrl(pdfUrl: string): string {
    // "/uploads/original/" を "/uploads/thumbnail/" に置換
    const thumbUrl = pdfUrl.replace("/uploads/original/", "/uploads/thumbnail/");
    // 末尾に ".png" が付いていなければ付加する
    if (!thumbUrl.endsWith(".png")) {
      return thumbUrl + ".png";
    }
    return thumbUrl;
  }
  