import { requestPresignedUrl, putPresignedUrl } from "@/api/register/register";

export const uploadImg = async (
  img: File,
  type: "registered-game" | "profile",
) => {
  try {
    const imgObj = {
      fileName: img.name,
      fileType: img.type,
      size: img.size,
    };
    /** 프리사인드 url 요청 */
    const { presignedUrl } = await requestPresignedUrl(imgObj, type);
    /** 프리사인드 url 업로드 */
    await putPresignedUrl(presignedUrl, img);
    /** 업로드 완료 후 이미지 url 반환 */
    const result = presignedUrl.split("?")[0];
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
