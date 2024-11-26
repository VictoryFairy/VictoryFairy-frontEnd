import { Meta, StoryFn } from "@storybook/react";
import * as icons from "@/assets/Icons/_index";
import Icon, { IconProps } from "../components/common/Icon";

const iconKeys = Object.keys(icons);
export default {
  title: "Components/Common/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "아이콘 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    icon: {
      options: iconKeys,
      control: {
        type: "select",
      },
    },
    fill: { control: "color" },
  },
} as Meta;

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: "IcArrowLeft",
  fill: "#2F3036",
};
