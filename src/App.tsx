import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import { routes as RoutesReact } from './routes';
import { AuthProvider } from './contexts/auth';
import { MovieProvider } from './contexts/movies';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <MovieProvider>
        <RoutesReact />
      </MovieProvider>
    </AuthProvider>
  </ChakraProvider>
);
