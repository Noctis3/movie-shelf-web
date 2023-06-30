import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const Julho = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
