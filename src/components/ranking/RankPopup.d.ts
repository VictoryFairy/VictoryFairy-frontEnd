import { Rank } from "@/types/Rank";
interface PopupProps {
    isOpen: boolean;
    teamId: number;
    withUser?: Rank | null;
    totalGames?: number;
    win?: number;
}
declare const RankPopup: ({ isOpen, teamId, withUser, totalGames, win, }: PopupProps) => import("react/jsx-runtime").JSX.Element;
export default RankPopup;
