import { MyGame } from "@/types/Game";
interface GameListItemProps {
    matches: MyGame[];
    onClick: (match: MyGame) => void;
}
declare const ListTab: ({ matches, onClick }: GameListItemProps) => import("react/jsx-runtime").JSX.Element;
export default ListTab;
