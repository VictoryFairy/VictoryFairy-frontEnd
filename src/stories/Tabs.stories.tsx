/* eslint-disable react/destructuring-assignment */
import { Meta, StoryFn } from "@storybook/react";
import Tabs, { TabProps } from "@/components/common/Tabs";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { useState } from "react";

export default {
  title: "Components/Common/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs 컴포넌트입니다.",
      },
    },
  },
} as Meta;

const Template: StoryFn<TabProps> = (args) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);
  const onTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ThemeContextProvider>
      <Tabs {...args} activeTab={activeTab} onTabClick={onTabClick} />
    </ThemeContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  labels: ["Tab 1", "Tab 2", "Tab 3"],
  activeTab: 0,
  direction: "row",
};

export const ColumnDirection = Template.bind({});
ColumnDirection.args = {
  labels: ["Tab 1", "Tab 2", "Tab 3"],
  activeTab: 0,
  direction: "column",
};
