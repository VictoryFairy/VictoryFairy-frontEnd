export const getFairyImg = (
  rate: number,
  teamId: number,
  format: "png" | "webp",
) => {
  let fairyStatus = "";

  if (rate > 30) {
    fairyStatus = "happy";
  } else {
    fairyStatus = "sad";
  }

  const imgUrl = `https://sngyo-image.s3.ap-northeast-2.amazonaws.com/fairyImg/${fairyStatus}/${teamId}.${format}`;
  return imgUrl;
};
