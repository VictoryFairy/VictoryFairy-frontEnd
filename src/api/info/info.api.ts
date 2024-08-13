import authAxiosInstance from "../authAxios";

interface StadiumsResponse {
  id: number;
  name: string;
  full_name: string;
  latitude: number;
  longitude: number;
}
export const getStadiums = async () => {
  try {
    const response =
      await authAxiosInstance.get<StadiumsResponse[]>("/stadiums");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getParkingInfosByStadiumId = async (id: number) => {
  try {
    const response = await authAxiosInstance.get(
      `/parking-infos/stadium/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
