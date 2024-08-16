import axios from "axios";
import { Player } from "../../types/Player";
import { Team } from "../../types/Team";
import authAxiosInstance from "../authAxios";

interface CheerSong {
  id: number;
  title: string;
  lyrics_preview: string;
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

export const fetchCheerSongs = async ({
  pageParam = 0,
  teamId,
  type,
}: {
  pageParam?: number;
  teamId: number;
  type: "team" | "player";
}) => {
  const response = await authAxiosInstance.get<FetchCheerSongsResponse>(
    `/cheering-songs/teams/${teamId}/types/${type}`,
    {
      params: { take: 5, cursor: pageParam },
    },
  );
  return response.data;
};
interface FetchSearchCheerSongsResponse {
  data: CheerSong[];
  meta: FetchCheerSongsMeta;
}

export const fetchSearchCheerSongs = async ({
  pageParam = 0,
  q,
}: {
  pageParam?: number;
  q: string;
}) => {
  const response = await authAxiosInstance.get<FetchSearchCheerSongsResponse>(
    `/cheering-songs/search`,
    {
      params: { take: 5, cursor: pageParam, q },
    },
  );
  return response.data;
};

export interface CheerSongDetailResponse {
  id: number;
  title: string;
  team: Team;
  player: Player | null;
  isLiked: boolean;
  lyrics: string;
  link: string;
}

export const fetchCheerSongDetail = async (id: number) => {
  const response = await authAxiosInstance.get<CheerSongDetailResponse>(
    `/cheering-songs/${id}`,
  );
  return response.data;
};

export interface FetchLikedCheerSongsResponse {
  data: CheerSong[];
  meta: FetchCheerSongsMeta;
}

export const FetchLikedCheerSongs = async ({
  pageParam = 0,
  type,
}: {
  pageParam?: number;
  type: "team" | "player";
}) => {
  const response = await authAxiosInstance.get<FetchLikedCheerSongsResponse>(
    `/cheering-songs/liked/types/${type}`,
    {
      params: { take: 5, cursor: pageParam },
    },
  );
  return response.data;
};

export const postLikeCheerSong = async (id: number) => {
  try {
    await authAxiosInstance.post(`/cheering-songs/${id}/likes`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            throw new Error("이미 좋아요 한 응원가 입니다");
          default:
            throw new Error("");
        }
      }
    }
  }
};
