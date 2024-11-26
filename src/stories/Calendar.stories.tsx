import { Meta, StoryFn } from "@storybook/react";
import Calendar from "@/components/common/Calendar";
import { CalendarProps } from "react-calendar";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default {
  title: "Components/Common/Calendar",
  component: Calendar,
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => (
  <ThemeContextProvider>
    <Calendar {...args} />
  </ThemeContextProvider>
);

export const Default = Template.bind({});
Default.args = {};
