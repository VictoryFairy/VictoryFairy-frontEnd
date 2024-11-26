import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/common/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";

export default {
  title: "Components/Common/Footer",
  component: Footer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeContextProvider>
          <Story />
        </ThemeContextProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
