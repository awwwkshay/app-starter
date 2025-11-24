import { ComponentProps, FC } from "react";

import { MarketingHeader } from "@/components";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

export type IMarketingLayoutProps =
  ComponentProps<"div">;

export const MarketingLayout: FC<
  IMarketingLayoutProps
> = (props) => {
  const { className, children } = props;
  const { themeClass } = useTheme();
  return (
    <>
      <link
        rel="icon"
        type="image/x-icon"
        href={
          themeClass === "light"
            ? "/favicon-dark.ico"
            : "/favicon-light.ico"
        }
      />
      <div
        className={cn(
          "w-screen min-h-screen flex flex-col px-32",
          className,
        )}
      >
        <MarketingHeader />
        <main className="flex-1 mb-8">
          {children}
        </main>
      </div>
    </>
  );
};
