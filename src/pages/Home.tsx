import { Heading } from '@chakra-ui/react';
import api from '../services/api';
import { useEffect } from 'react';

export const Home = () => {
  async function teste() {
    try {
      const { data } = await api.get('/authentication');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  teste();

  return <Heading>Olá</Heading>;
};
