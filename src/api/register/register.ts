import authAxiosInstance from "../authAxios";

export const postUploadImg = async (formData: any) => {
  try {
    const respone = await authAxiosInstance.post(
      "/s3-store/registered-game",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return respone.data;
  } catch (err) {
    console.error(err);
  }
};

export const postRegisterGame = async (data: any) => {
  try {
    const response = await authAxiosInstance.post("/registered-games", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
