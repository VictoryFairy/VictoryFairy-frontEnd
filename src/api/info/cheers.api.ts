import authAxiosInstance from "../authAxios";

interface CheerSong {
  id: number;
  title: string;
  lyric: string;
  team: string;
  isLiked: boolean;
}

interface FetchCheerSongsResponse {
  data: CheerSong[];
  meta: {
    take: number;
    cursor: number;
    hasNextData: boolean;
  };
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
  const response: FetchCheerSongsResponse = await authAxiosInstance.get(
    `/cheering-songs/teams/${teamId}/types/${type}`,
    {
      params: { take: 5, cursor: pageParam },
    },
  );
  return response.data;
};
