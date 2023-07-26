import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import tmdbLogo from '../assets/images/tmdb.png';
import { MovieData, genres } from '../types/movies';
import { getMoviePoster } from '../types/requests';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: MovieData;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const releaseYear = movie.release_date.split('-')[0];
  const navigate = useNavigate();
  const movieGenres = movie.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : '';
  });
  const genreNames = movieGenres.join(', ');

  function selectMovie() {
    navigate(`/movie/${movie.id}`);
  }
  return (
    <Flex
      direction={{ base: 'row', md: 'column' }}
      minW={{ base: '11rem', md: '16rem' }}
      h={{ base: 'auto', md: 'auto' }}
      gap={{ base: '1rem' }}
    >
      <Image
        w={{ base: '11rem', md: '16rem' }}
        h={{ base: '17.6rem', md: '24rem' }}
        align="center"
        objectFit="cover"
        src={getMoviePoster(movie.poster_path)}
        borderRadius="1rem"
        onClick={selectMovie}
        cursor="pointer"
      />
      <VStack spacing=".5rem" align="start" w="100%">
        <Text variant="subtitle">{releaseYear}</Text>
        <Heading maxW={{ md: '16rem' }} as="h4" size="sm" noOfLines={1}>
          {movie.title}
        </Heading>
        <HStack>
          <Image src={tmdbLogo} />
          <Text fontSize="xs">
            {(movie.vote_average * 10).toFixed(0)} / 100
          </Text>
        </HStack>
        <Text
          noOfLines={1}
          maxW={{ md: '16rem' }}
          overflow="hidden"
          variant="subtitle"
        >
          {genreNames}
        </Text>
        <Text
          h="100%"
          maxH="8rem"
          variant="subtitle"
          color="black"
          overflow={'hidden'}
          display={{ base: 'flex', md: 'none' }}
        >
          {movie.overview}
        </Text>
      </VStack>
    </Flex>
  );
};

export default MovieCard;
