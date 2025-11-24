import { RouteObject } from "react-router";

import { AboutPage } from "./about";
import { HomePage } from "./home";
import { NotFoundPage } from "./not-found";

export enum RouteNames {
  HOME = "Home",
  ABOUT = "About",
  NOT_FOUND = "Not Found",
}

export const RoutePaths = {
  [RouteNames.HOME]: "/",
  [RouteNames.ABOUT]: "/about",
  [RouteNames.NOT_FOUND]: "*",
};

export const routes: RouteObject[] = [
  {
    id: RouteNames.HOME,
    path: RoutePaths[RouteNames.HOME],
    Component: HomePage,
    index: true,
  },
  {
    id: RouteNames.ABOUT,
    path: RoutePaths[RouteNames.ABOUT],
    Component: AboutPage,
  },
  {
    id: RouteNames.NOT_FOUND,
    path: RoutePaths[RouteNames.NOT_FOUND],
    Component: NotFoundPage,
  },
];
