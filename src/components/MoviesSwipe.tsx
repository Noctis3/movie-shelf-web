import { Box, Flex, HStack, Heading } from '@chakra-ui/layout';
import { MovieData, genres } from '../types/movies';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import api from '../services/api';
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
    <Flex gap="2.75rem" direction="column" padding="0 6rem">
      <HStack justifyContent="space-between">
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
      </HStack>

      <HStack spacing={'5rem'}>
        {movieList.map((movie, i) => {
          const movieGenres = movie.genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return genre ? genre.name : '';
          });
          const genreNames = movieGenres.join(', ');
          const releaseYear = movie.release_date.split('-')[0];
          return (
            <MovieCard
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              release={releaseYear}
              genres={genreNames}
              rating={movie.vote_average * 10}
            />
          );
        })}
      </HStack>
    </Flex>
  );
};

export default MoviesSwipe;
