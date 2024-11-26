import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeContextProvider } from "../src/context/ThemeContext";
import { GlobalStyle } from "../src/style/global";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <GlobalStyle />
        <Story />
      </ThemeContextProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
