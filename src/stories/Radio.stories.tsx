/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Radio, { RadioProps } from "@/components/common/Radio";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default {
  title: "Components/Common/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "라디오 컴포넌트입니다.",
      },
    },
  },
} as Meta;

// Single Radio Template
const SingleTemplate: StoryFn<RadioProps> = (args) => {
  const [checked, setChecked] = useState(args.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    args.onChange(e);
  };

  return (
    <ThemeContextProvider>
      <Radio {...args} checked={checked} onChange={handleChange} />
    </ThemeContextProvider>
  );
};

export const Default = SingleTemplate.bind({});
Default.args = {
  label: "Radio Label",
  checked: false,
  onChange: () => {
    console.log("Radio Clicked");
  },
};

// Group Radio Template
const GroupTemplate: StoryFn = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const radios = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <ThemeContextProvider>
      {radios.map((radio) => (
        <Radio
          key={radio.value}
          label={radio.label}
          checked={selectedValues.includes(radio.value)}
          onChange={() => setSelectedValues([radio.value])}
        />
      ))}
      <p>Selected Value: {selectedValues.join(", ")}</p>
    </ThemeContextProvider>
  );
};

export const Group = GroupTemplate.bind({});
