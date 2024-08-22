import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
interface CheerSong {
    id: number;
    title: string;
    lyricsPreview: string;
    team: Team;
    player: Player | null;
    isLiked: boolean;
}
interface FetchCheerSongsMeta {
    take: number;
    hasNextData: boolean;
    cursor: number;
}
export interface FetchCheerSongsResponse {
    data: CheerSong[];
    meta: FetchCheerSongsMeta;
}
export declare const fetchCheerSongs: ({ pageParam, teamId, type, }: {
    pageParam?: number;
    teamId: number;
    type: "team" | "player";
}) => Promise<FetchCheerSongsResponse>;
interface FetchSearchCheerSongsResponse {
    data: CheerSong[];
    meta: FetchCheerSongsMeta;
}
export declare const fetchSearchCheerSongs: ({ pageParam, q, }: {
    pageParam?: number;
    q: string;
}) => Promise<FetchSearchCheerSongsResponse>;
export interface CheerSongDetailResponse {
    id: number;
    title: string;
    team: Team;
    player: Player | null;
    isLiked: boolean;
    lyrics: string;
    link: string;
}
export declare const fetchCheerSongDetail: (id: number) => Promise<CheerSongDetailResponse>;
export interface FetchLikedCheerSongsResponse {
    data: CheerSong[];
    meta: FetchCheerSongsMeta;
}
export declare const FetchLikedCheerSongs: ({ pageParam, type, }: {
    pageParam?: number;
    type: "team" | "player";
}) => Promise<FetchLikedCheerSongsResponse>;
export declare const postLikeCheerSong: (id: number) => Promise<void>;
export declare const deleteLikeCheerSong: (id: number) => Promise<void>;
export {};
