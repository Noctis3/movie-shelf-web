import { Box, Flex, HStack, Heading } from '@chakra-ui/layout';
import { MovieData, genres } from '../types/movies';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GET_MOVIE_LIST } from '../types/requests';
import { FaChevronRight } from 'react-icons/fa';
import { Button } from '@chakra-ui/button';

interface MoviesSwipeProps {
  movieList: MovieData[];
  sectionTitle: string;
}

const MoviesSwipe: React.FC<MoviesSwipeProps> = ({
  movieList,
  sectionTitle,
}) => {
  return (
    <Flex
      w="100%"
      gap={{ base: '1.25rem', md: '2.75rem' }}
      direction="column"
      padding={['0 1rem', '0 3rem', '0 6rem']}
    >
      <Flex direction={'row'} justifyContent="space-between">
        <Heading>{sectionTitle}</Heading>
        <Button
          rightIcon={<FaChevronRight />}
          color="purple.600"
          fontWeight="light"
          bgColor="none"
          _hover={{
            backgroundColor: 'transparent',
            color: 'purple',
          }}
        >
          Ver mais
        </Button>
      </Flex>

      <Flex
        gap={{ base: '1.25rem', md: '5rem' }}
        direction={{ base: 'column', md: 'row' }}
      >
        {movieList.map((movie, i) => {
          return (
            <div key={i}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MoviesSwipe;
