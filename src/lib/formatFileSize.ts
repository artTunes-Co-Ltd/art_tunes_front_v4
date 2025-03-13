/**
 * バイト数を KB または MB の単位で表示する関数
 * @param bytes - ファイルサイズ（バイト数）
 * @returns 読みやすいサイズ表記（例: "4.19 MB", "512.00 KB"）
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} bytes`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  }
  