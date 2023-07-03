import { Heading } from '@chakra-ui/react';
import api from '../services/api';
import { useEffect } from 'react';

export const Home = () => {
  api
    .get('/movie/upcoming')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
    });

  return <Heading>Olá</Heading>;
};
