import { MyInfo } from "@/api/rank/rank.api";
import { Rank } from "@/types/Rank";
interface MyRankCompType extends MyInfo {
    withUser: Rank | null;
}
declare const MyRankComp: ({ totalGames, win, withUser }: MyRankCompType) => import("react/jsx-runtime").JSX.Element;
export default MyRankComp;
