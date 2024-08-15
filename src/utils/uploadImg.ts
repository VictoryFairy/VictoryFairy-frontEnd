import { postUploadImg } from "@/api/register/register";

export const uploadImg = async (img: File) => {
  const formData = new FormData();
  formData.append("file", img);
  // 응답값 수정 필요
  const { profileImgUrl } = await postUploadImg(formData);
  return profileImgUrl;
};
