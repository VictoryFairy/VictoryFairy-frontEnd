export const getFairyImg = (
  rate: number,
  teamId: number,
  format: "png" | "webp",
) => {
  const fairyStatus = rate > 30 ? "happy" : "sad";

  // 현재 시간을 기반으로 캐시 무효화 쿼리 추가
  const timestamp = Date.now();
  const imgUrl = `https://sngyo-image.s3.ap-northeast-2.amazonaws.com/fairyImg/${fairyStatus}/${teamId}.${format}?v=${timestamp}`;

  return imgUrl;
};
