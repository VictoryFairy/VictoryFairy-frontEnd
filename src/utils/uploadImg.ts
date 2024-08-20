import { postUploadImg } from "@/api/register/register";

export const uploadImg = async (img: File) => {
  try {
    const formData = new FormData();
    formData.append("file", img);
    const { registeredGameImgUrl } = await postUploadImg(formData);
    return registeredGameImgUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
