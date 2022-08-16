import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeDark, themeLight } from "../theme";
import { ITheme, IThemeContext } from "./interfaces";

const ThemeContext = createContext<IThemeContext>({
  theme: themeLight,
  handleChangeTheme: () => {},
  isDarkMode: false,
});

export const ThemeContextProvider: React.FC<{
  children: ReactNode;
  handleChangeTheme?: void;
}> = ({ children }) => {
  const [theme, setTheme] = useState<any>(themeLight);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    async function getTheme() {
      const temp = await AsyncStorage.getItem("theme");
      setTheme(temp?.toString() === "dark" ? themeDark : themeLight);
    }
    getTheme();
  }, []);

  function handleChangeTheme(tempTheme: string) {
    setTheme(tempTheme === "dark" ? themeDark : themeLight);
    AsyncStorage.setItem("theme", tempTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
