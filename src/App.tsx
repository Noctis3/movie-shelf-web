import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
