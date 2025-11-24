import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import { routes } from "./pages";
import "./i18n";

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
