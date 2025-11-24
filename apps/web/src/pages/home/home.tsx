import { useTranslation } from "react-i18next";

import { Counter, TodoPanel } from "@/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MarketingLayout } from "@/layouts";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <MarketingLayout>
      <div className="flex flex-col gap-16 justify-center items-center">
        <h1 className="text-6xl text-center leading-relaxed">
          {t("hero.title1")}
          <br />
          {t("hero.title2")}
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Feature Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc">
              <li className="mb-2">
                <a
                  href="https://vitejs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Vite
                </a>{" "}
                - The next generation build tool
                for the web
              </li>
              <li className="mb-2">
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  React 19
                </a>{" "}
                - A powerful JavaScript library
                for building user interfaces
              </li>
              <li className="mb-2">
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Tailwind CSS
                </a>{" "}
                - A utility-first CSS framework
                for building custom designs
              </li>
              <li className="mb-2">
                <a
                  href="https://reactrouter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  React Router
                </a>{" "}
                - Declarative routing for
                React.js
              </li>
              <li className="mb-2">
                <a
                  href="https://typicode.github.io/husky/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Husky
                </a>{" "}
                - Modern native Git hooks made
                easy
              </li>
              <li>
                <a
                  href="https://react.dev/learn/react-compiler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  React Compiler
                </a>{" "}
                - Gone are the days of useMemo
                and useCallback
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <h3>
              Authored by{" "}
              <a
                href="https://github.com/Akshay-Priyadarshi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Akshay Priyadarshi
              </a>{" "}
              with ❤️ from India
            </h3>
          </CardFooter>
        </Card>
        <Counter />
        <TodoPanel />
      </div>
    </MarketingLayout>
  );
};
