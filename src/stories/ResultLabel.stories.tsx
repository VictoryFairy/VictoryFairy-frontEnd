import { Meta, StoryFn } from "@storybook/react";
import ResultLabel, { ResultLabelProps } from "@/components/common/ResultLabel";

export default {
  title: "Components/Common/ResultLabel",
  component: ResultLabel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "경기 결과 라벨 컴포넌트입니다. 테마에 따라 색상이 달라집니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          width: "100px",
          backgroundColor: "var(--gray-100)",
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<ResultLabelProps> = (args) => <ResultLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  result: null,
  status: "경기전",
};

export const InProgress = Template.bind({});
InProgress.args = {
  result: null,
  status: "경기중",
};

export const Win = Template.bind({});
Win.args = {
  result: "Win",
  status: "경기종료",
};

export const Lose = Template.bind({});
Lose.args = {
  result: "Lose",
  status: "경기종료",
};

export const Tie = Template.bind({});
Tie.args = {
  result: "Tie",
  status: "경기종료",
};

export const NoGame = Template.bind({});
NoGame.args = {
  result: "No game",
  status: "우천취소",
};
