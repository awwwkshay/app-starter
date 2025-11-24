import { create } from "zustand";
import {
  devtools,
  persist,
} from "zustand/middleware";

import { ITheme, IThemeClass } from "@/types";

interface IThemeStore {
  theme: ITheme;
  themeClass?: IThemeClass;
  setTheme: (theme: ITheme) => void;
  setThemeClass: (
    themeClass: IThemeClass,
  ) => void;
}

export const useThemeStore =
  create<IThemeStore>()(
    devtools(
      persist(
        (set) => ({
          theme: "system",
          themeClass: undefined,
          setTheme: (theme) => {
            set({ theme: theme });
          },
          setThemeClass: (themeClass) => {
            set({ themeClass: themeClass });
          },
        }),
        {
          name: "themeStore",
          partialize: (state) => ({
            theme: state.theme,
            themeClass: state.themeClass,
          }),
        },
      ),
    ),
  );
