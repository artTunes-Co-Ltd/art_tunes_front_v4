// src/types/Node.ts
export type DisplayDataType = "web" | "pdf" | "instagram" | "threads" | "youtube";

export interface NodeItem {
    id: number;
    sort: number;
    name: string;
    description: string;
    link: string;
    displayDataType: DisplayDataType;
  // ... createdAt, updatedAtなど必要なら追加
}
