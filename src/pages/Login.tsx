import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  ToastPosition,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const toast = useToast();
  type toastStatus =
    | 'error'
    | 'success'
    | 'info'
    | 'warning'
    | 'loading'
    | undefined;

  const toasts = {
    erro: {
      title: 'Erro ao logar',
      position: 'top-right' as ToastPosition | undefined,
      status: 'error' as toastStatus,
      isClosable: true,
    },
    success: {
      title: 'Bem-vindo :D',
      position: 'top-right' as ToastPosition | undefined,
      status: 'success' as toastStatus,
      isClosable: true,
    },
  };

  async function handleSignIn() {
    try {
      await signIn({ username, password });
      navigate('/');
      toast(toasts.success);
    } catch (error) {
      toast(toasts.erro);
    }
  }

  const moviedbRegisterLink = 'https://www.themoviedb.org/signup';
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          minW={'21rem'}
          rounded={'lg'}
          bg={useColorModeValue('white', '#424242')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Link color={'blue.400'} href={moviedbRegisterLink} isExternal>
                Cadastre-se
              </Link>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignIn}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
