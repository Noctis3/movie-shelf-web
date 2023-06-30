import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
];
