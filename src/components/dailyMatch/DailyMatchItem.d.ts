import { Game } from "../../types/Game";
interface DailyMatchItemProps {
    match: Game;
    isSelected: boolean;
    onSelect: () => void;
}
declare const DailyMatchItem: ({ match, isSelected, onSelect, }: DailyMatchItemProps) => import("react/jsx-runtime").JSX.Element;
export default DailyMatchItem;
