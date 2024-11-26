import { Meta, StoryFn } from "@storybook/react";
import { Team } from "@/types/Game";
import GameListItem, {
  GameListItemProps,
} from "../components/common/GameListItem";

export default {
  title: "Components/Common/GameListItem",
  component: GameListItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "게임 리스트 아이템 컴포넌트입니다. 자신이 응원하는 팀에 따라 승/패 테마가 달라집니다.",
      },
    },
  },
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
