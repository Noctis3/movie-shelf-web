import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Julho } from "./routes";
export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <Julho />
  </ChakraProvider>
);
