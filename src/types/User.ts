export interface User {
    uid: string;
    displayID: string;
    uniqueID?: string;
    displayName: string;
    icon: string;
    headerImageUrl: string;
    ogpImageUrl: string;
    category: string;
    role: string;
    title: string;
    profile?: string;
    eyeCatches?: string[];
}