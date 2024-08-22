import { MyGame } from "@/types/Game";
interface GameListItemProps {
    match: MyGame;
    onClick?: (match: MyGame) => void;
}
declare const GameListItem: ({ match, onClick }: GameListItemProps) => import("react/jsx-runtime").JSX.Element;
export declare const GameListItemContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, never>> & string;
export default GameListItem;
