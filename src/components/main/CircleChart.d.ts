interface TeamStats {
    total: number;
    win: number;
}
interface TeamStatsData {
    totalWin: number;
    homeWin: number;
    oppTeam: {
        [teamId: string]: TeamStats;
    };
}
declare const CircleChart: ({ teamData }: {
    teamData: TeamStatsData;
}) => import("react/jsx-runtime").JSX.Element;
export default CircleChart;
