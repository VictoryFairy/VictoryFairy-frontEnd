import RankingTab from "../components/ranking/RankingTab";
import { DetailHelmet } from "./helmets/DetailHelmet";

const Ranking = () => {
  return (
    <>
      <DetailHelmet
        title='랭킹'
        eventDetail='승리요정 랭킹'
        pageTitle='랭킹'
        url='sngyo.com/ranking'
      />
      <RankingTab />
    </>
  );
};

export default Ranking;
