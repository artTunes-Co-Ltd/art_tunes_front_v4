/**
 * チャンネル登録者数を「○○万人」「○○人」表記に変換する関数
 * 例:
 *   2750000  -> "275万人"
 *   25000    -> "2万人"
 *   9999     -> "9999人"
 */
export function formatSubscriberCount(count: number): string {
    if (count >= 10_000) {
      // 1万以上の場合、(count / 10000) を切り捨てして "万人" 表記
      const man = Math.floor(count / 10_000);
      return `${man}万人`;
    }
    // 1万未満なら「○○人」
    return `${count}人`;
  }
