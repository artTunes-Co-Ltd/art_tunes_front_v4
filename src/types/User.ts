export interface User {
    uid: string;
    displayID: string;
    displayName: string;
    icon: string;
    headerImageUrl: string;
    category: string;
    role: string;
    title: string;
    profile?: string;
    eyeCatches?: string[];
}