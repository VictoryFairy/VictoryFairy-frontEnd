import { Meta, StoryFn } from "@storybook/react";

import Button, { ButtonProps } from "./Button";

export default {
  title: "Components/Common/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["default", "disabled", "error"],
      },
    },
    styletype: {
      control: {
        type: "radio",
        options: ["default", "outline", "text"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["small", "big"],
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "버튼",
  variant: "default",
  styletype: "default",
  size: "small",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "버튼",
  variant: "disabled",
  styletype: "default",
  size: "small",
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  children: "버튼",
  variant: "error",
  styletype: "default",
  size: "small",
  disabled: false,
};
