/* eslint-disable react/destructuring-assignment */
import { Meta, StoryFn } from "@storybook/react";
import SelectionBar, {
  SelectionBarProps,
} from "@/components/common/SelectionBar";
import { useState } from "react";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default {
  title: "Components/Common/SelectionBar",
  component: SelectionBar,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#f0f0f0",
          height: "100px",
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<SelectionBarProps> = (args) => {
  const [activeSelect, setActiveSelect] = useState(args.activeSelect);
  const onSelectClick = (index: number) => {
    setActiveSelect(index);
  };

  return (
    <ThemeContextProvider>
      <SelectionBar
        {...args}
        activeSelect={activeSelect}
        onSelectClick={onSelectClick}
      />
    </ThemeContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  labels: ["Tab 1", "Tab 2", "Tab 3"],
  activeSelect: 0,
  direction: "row",
};

export const ColumnDirection = Template.bind({});
ColumnDirection.args = {
  labels: ["Tab 1", "Tab 2", "Tab 3"],
  activeSelect: 0,
  direction: "column",
};
