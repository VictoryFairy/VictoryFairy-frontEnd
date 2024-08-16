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
