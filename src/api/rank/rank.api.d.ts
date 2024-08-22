import { Rank } from "@/types/Rank";
export interface MyInfo {
    userId?: number;
    totalGames: number;
    win: number;
}
export interface ApiResponse {
    top: Rank[];
    nearBy: Rank[];
    user: MyInfo;
}
export declare const getRankList: (teamId: number) => Promise<Rank[]>;
export declare const getTopRank: (teamId: number) => Promise<ApiResponse>;
export declare const getNearbyRank: (teamId: number) => Promise<ApiResponse>;
