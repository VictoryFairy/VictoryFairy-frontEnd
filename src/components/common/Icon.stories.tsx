import { Meta, StoryFn } from "@storybook/react";
import * as icons from "@/assets/Icons/_index";
import Icon, { IconProps } from "./Icon";

const iconKeys = Object.keys(icons);
console.log(icons);
export default {
  title: "Components/Common/Icon",
  component: Icon,
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
