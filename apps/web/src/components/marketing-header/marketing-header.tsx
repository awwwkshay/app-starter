import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import LogoDark from "@/assets/logo-dark.svg?react";
import LogoLight from "@/assets/logo-light.svg?react";
import { useTheme } from "@/hooks";
import { stringTitleCase } from "@/utils";

import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export const MarketingHeader = () => {
  const { themeClass } = useTheme();
  const { t } = useTranslation();
  return (
    <nav className="flex justify-between items-center my-16">
      <div>
        <Link to="/">
          {themeClass === "light" ? (
            <LogoDark className="size-8" />
          ) : (
            <LogoLight className="size-8" />
          )}
        </Link>
      </div>
      <ul className="flex items-center space-x-8">
        <li>
          <Link to="/contact">
            {stringTitleCase(t("contact"))}
          </Link>
        </li>
        <li>
          <Link to="/about">
            {stringTitleCase(t("about"))}
          </Link>
        </li>
        <Button>
          {stringTitleCase(t("login"))}
        </Button>
        <Button>
          {stringTitleCase(t("signup"))}
        </Button>
        <ThemeToggle />
        <LanguageToggle />
      </ul>
    </nav>
  );
};
