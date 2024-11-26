import { Meta, StoryFn } from "@storybook/react";
import Tooltip, { TooltipProps } from "@/components/common/ToolTip";

export default {
  title: "Components/Common/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tooltip 컴포넌트입니다.",
      },
    },
  },
} as Meta;

const Template: StoryFn<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <span>마우스를 올려보세요.</span>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  text: "툴팁입니다.",
};
