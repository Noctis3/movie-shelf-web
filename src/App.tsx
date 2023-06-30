import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

const router = createBrowserRouter(Routes);

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <RouterProvider router={router} />
  </ChakraProvider>
);
