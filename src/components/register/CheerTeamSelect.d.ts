import { Team } from "@/types/Game";
interface CheerTeamSelectProps {
    setCheeringTeamId: (id: number) => void;
    awayTeam: Team;
    homeTeam: Team;
}
declare const CheerTeamSelect: ({ setCheeringTeamId, awayTeam, homeTeam, }: CheerTeamSelectProps) => import("react/jsx-runtime").JSX.Element;
export default CheerTeamSelect;
