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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import api from '../services/api';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../types/requests';
import { AuthContext } from '../contexts/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  async function signIn(username: string, password: string) {
    try {
      const createRequestTokenResponse = await api.get(CREATE_REQUEST_TOKEN);
      console.log(createRequestTokenResponse.data);
      const validateRequestTokenResponse = await api.post(
        VALIDATE_REQUEST_TOKEN,
        {
          username,
          password,
          request_token: createRequestTokenResponse.data.request_token,
        }
      );
      console.log(validateRequestTokenResponse.data);
      const createSessionResponse = await api.post(CREATE_SESSION, {
        request_token: validateRequestTokenResponse.data.request_token,
      });
      console.log(createSessionResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function handleSignIn() {
    try {
      await signIn(username, password);
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao logar',
        position: 'top-right',
        status: 'error',
        isClosable: true,
      });
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
