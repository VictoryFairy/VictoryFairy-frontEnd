interface RankData {
    rank: number;
    score: number;
    nickname: string;
    userId?: number;
}
interface RankBarProps {
    data: RankData[] | null;
    tab: number;
}
declare const RankBar: ({ data, tab }: RankBarProps) => import("react/jsx-runtime").JSX.Element;
export default RankBar;
