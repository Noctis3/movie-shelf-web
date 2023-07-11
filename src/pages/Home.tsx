import { Heading } from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

export const Home = () => {
  const { user } = useContext(AuthContext);
  return <Heading>Olá {user.username}</Heading>;
};
