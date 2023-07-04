import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import { routes as RoutesReact } from './routes';

export const App = () => (
  <ChakraProvider theme={theme}>
    <RoutesReact />
  </ChakraProvider>
);
