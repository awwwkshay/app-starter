import { create } from "zustand";
import {
  devtools,
  persist,
} from "zustand/middleware";

import { ILanguage } from "@/types";

export type ILanguageStore = {
  language: ILanguage;
  setLanguage: (theme: ILanguage) => void;
};

export const useLanguageStore =
  create<ILanguageStore>()(
    devtools(
      persist(
        (set) => ({
          language: "en",
          setLanguage: (language: ILanguage) =>
            set({ language }),
        }),
        {
          name: "languageStore",
          partialize: (state) => ({
            language: state.language,
          }),
        },
      ),
    ),
  );
