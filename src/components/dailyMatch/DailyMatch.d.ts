import { Game } from "../../types/Game";
interface DailyMatchProps {
    matches: Game[];
    selectedMatch: Game | null;
    setSelectedMatch: React.Dispatch<React.SetStateAction<Game | null>>;
}
declare const DailyMatch: ({ matches, selectedMatch, setSelectedMatch, }: DailyMatchProps) => import("react/jsx-runtime").JSX.Element;
export default DailyMatch;
