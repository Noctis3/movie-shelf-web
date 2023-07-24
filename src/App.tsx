import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import { routes as RoutesReact } from './routes';
import { AuthProvider } from './contexts/auth';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <RoutesReact />
    </AuthProvider>
  </ChakraProvider>
);
