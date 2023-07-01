import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { routes as RoutesReact } from './routes';
export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <RoutesReact />
  </ChakraProvider>
);
