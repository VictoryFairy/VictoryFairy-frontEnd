import authAxiosInstance from "../authAxios";

export interface DailyMatchResponse {
  id: string;
  date: string;
  time: string;
  status: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  stadium: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
  };
  homeTeamScore: number;
  awayTeamScore: number;
  winningTeam: {
    id: number;
    name: string;
  };
}

export const getDailyMatch = async (
  year: number,
  month: number,
  day: number,
) => {
  try {
    const response = await authAxiosInstance.get<DailyMatchResponse[]>(
      "/games/daily",
      {
        params: {
          year,
          month,
          day,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
