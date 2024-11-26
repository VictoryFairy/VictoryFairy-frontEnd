import { Meta, StoryFn } from "@storybook/react";
import { Team } from "@/types/Game";
import { ThemeContextProvider } from "@/context/ThemeContext";
import GameListItem, {
  GameListItemProps,
} from "../components/common/GameListItem";

export default {
  title: "Components/Common/GameListItem",
  component: GameListItem,

  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<GameListItemProps> = (args) => (
  <GameListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  result: null,
  isWinningTeam: undefined,
  homeTeam: { id: 7, name: "LG" } as Team,
  homeTeamScore: 0,
  awayTeam: { id: 8, name: "키움" } as Team,
  awayTeamScore: 0,
  date: "2023-10-01",
  stadium: {
    id: 1,
    name: "Stadium",
    latitude: 37.1234,
    longitude: 126.1234,
    address: "Seoul",
  },
  status: "경기중",
  onClick: () => alert("GameListItem clicked"),
};

export const WinningTeam = Template.bind({});
WinningTeam.args = {
  result: "Win",
  isWinningTeam: { id: 7, name: "LG" } as Team,
  homeTeam: { id: 7, name: "LG" } as Team,
  homeTeamScore: 1,
  awayTeam: { id: 8, name: "키움" } as Team,
  awayTeamScore: 0,
  date: "2023-10-01",
  stadium: {
    id: 1,
    name: "Stadium",
    latitude: 37.1234,
    longitude: 126.1234,
    address: "Seoul",
  },
  status: "경기종료",
  onClick: () => alert("GameListItem clicked"),
};

export const LosingTeam = Template.bind({});
LosingTeam.args = {
  result: "Lose",
  isWinningTeam: { id: 8, name: "키움" } as Team,
  homeTeam: { id: 7, name: "LG" } as Team,
  homeTeamScore: 0,
  awayTeam: { id: 8, name: "키움" } as Team,
  awayTeamScore: 1,
  date: "2023-10-01",
  stadium: {
    id: 1,
    name: "Stadium",
    latitude: 37.1234,
    longitude: 126.1234,
    address: "Seoul",
  },
  status: "경기종료",
  onClick: () => alert("GameListItem clicked"),
};
