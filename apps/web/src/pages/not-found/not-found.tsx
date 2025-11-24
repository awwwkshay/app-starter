import { Link } from "react-router";

import PageNotFound from "@/assets/page-not-found.svg?react";
import { MarketingLayout } from "@/layouts";

import { RouteNames } from "../routes";

export const NotFoundPage = () => {
  return (
    <>
      <title>{`${RouteNames.NOT_FOUND} | React Starter`}</title>
      <MarketingLayout>
        <div className="flex flex-col gap-16 justify-center items-center h-full">
          <PageNotFound className="w-1/2 h-1/2" />
          <Link to="/">
            Seems like you are lost! Go Back To
            Homepage
          </Link>
        </div>
      </MarketingLayout>
    </>
  );
};
