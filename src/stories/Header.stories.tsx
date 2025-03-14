import { Meta, StoryFn } from "@storybook/react";
import Header, { HeaderProps } from "../components/common/Header";
import Icon from "../components/common/Icon";

export default {
  title: "Components/Common/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Header 컴포넌트입니다.",
      },
    },
  },
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  left: <Icon icon='IcArrowLeft' />,
  center: <div>Center Content</div>,
  right: <Icon icon='IcArrowRight' />,
};

export const OnlyLeft = Template.bind({});
OnlyLeft.args = {
  left: <Icon icon='IcArrowLeft' />,
  center: null,
  right: null,
};

export const OnlyCenter = Template.bind({});
OnlyCenter.args = {
  left: null,
  center: <div>Center Content</div>,
  right: null,
};

export const OnlyRight = Template.bind({});
OnlyRight.args = {
  left: null,
  center: null,
  right: <Icon icon='IcArrowRight' />,
};
