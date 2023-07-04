import { useState } from 'react';
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
} from '@chakra-ui/react';
import api from '../services/api';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../types/requests';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
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
      const accountDetails = await api.get(
        `${GET_ACCOUNT_DETAILS}?session_id=${createSessionResponse.data.session_id}`
      );
      console.log(accountDetails.data);
    } catch (error) {
      console.log(error);
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
