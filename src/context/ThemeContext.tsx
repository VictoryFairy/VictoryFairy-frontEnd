/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";
import { getTheme } from "../style/theme";

export const state = {
  themeName: "",
};

export const ThemeContext = createContext(state);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState("NC다이노스");

  // useEffect(() => {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setThemeName(theme);
  //   }
  // }, []);

  return (
    <ThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
