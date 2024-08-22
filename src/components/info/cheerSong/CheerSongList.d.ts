declare const teamColors: {
    롯데: string;
    삼성: string;
    LG: string;
    두산: string;
    SSG: string;
    KT: string;
    한화: string;
    NC: string;
    KIA: string;
    키움: string;
};
export type TeamName = keyof typeof teamColors;
export interface CheerSongListProps {
    id: number;
    teamName: TeamName;
    title: string;
    lyricPreview?: string;
    jerseyNumber?: string;
    isLiked?: boolean;
    selectedTeamId?: number;
    activeTab?: number;
    type?: string;
    searchTerm?: string;
    setRecentSearches?: (data: CheerSongListProps[]) => void;
}
declare const CheerSongList: ({ id, teamName, title, lyricPreview, jerseyNumber, isLiked, selectedTeamId, activeTab, type, searchTerm, setRecentSearches, }: CheerSongListProps) => import("react/jsx-runtime").JSX.Element;
export default CheerSongList;
