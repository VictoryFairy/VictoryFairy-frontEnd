import { Meta, StoryFn } from "@storybook/react";

import Button, { ButtonProps } from "../components/common/Button";

export default {
  title: "Components/Common/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "disabled", "error"],
      control: {
        type: "radio",
      },
    },
    styletype: {
      options: ["default", "outline", "text"],
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["small", "big"],
      control: {
        type: "radio",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "버튼 컴포넌트입니다.",
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
