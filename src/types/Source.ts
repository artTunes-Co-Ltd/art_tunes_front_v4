export interface Source {
    id: number;
    title: string;
    description: string;
    web_title: string;
    url: string;
    createdAt: string;        // time.Time を ISO文字列で受け取る
    updatedAt?: string;       // optional
    deletedAt?: string | null;// optional
}