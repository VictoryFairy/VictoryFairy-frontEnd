/* eslint-disable react/destructuring-assignment */
import { Meta, StoryFn } from "@storybook/react";
import SelectionBar, {
  SelectionBarProps,
} from "@/components/common/SelectionBar";
import { useState } from "react";

export default {
  title: "Components/Common/SelectionBar",
  component: SelectionBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "selectionBar 컴포넌트입니다.",
      },
    },
  },
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
    <SelectionBar
      {...args}
      activeSelect={activeSelect}
      onSelectClick={onSelectClick}
    />
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
