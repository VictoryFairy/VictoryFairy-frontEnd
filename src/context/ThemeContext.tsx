/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useAuthStore } from "@/store/authStore";
import { getTeamName } from "@/utils/getTeamName";
import { GlobalStyle } from "../style/global";
import { getTheme } from "../style/theme";

export const state = {
  themeName: "default",
};

export const ThemeContext = createContext(state);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState("");
  const { teamId } = useAuthStore();

  useEffect(() => {
    const teamName = getTeamName(teamId);
    setThemeName(teamName);
  }, [teamId]);

  return (
    <ThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
