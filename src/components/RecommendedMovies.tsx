import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MovieData, genres } from '../types/movies';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { api, openai } from '../services/api';
import { GET_MOVIE_LIST, searchMovies } from '../types/requests';
import { FaChevronRight, FaMagic } from 'react-icons/fa';
import { Button } from '@chakra-ui/button';

interface movieListFromOPENAI {
  title: string;
}

interface RecommendedMoviesProps {
  movieList: string[];
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ movieList }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerateRecommendations() {
    setLoading(true);
    const recommendationResponse = await openai.post('/recommended-movies', {
      movies: JSON.stringify(movieList),
    });
    const recommendedNameList = recommendationResponse.data.map(
      (movie: { title: string }) => movie.title
    );
    console.log(recommendedNameList);

    const moviePromises = recommendedNameList.map(async (movieName: string) => {
      const movieResponse = await api.get(searchMovies(movieName));
      const movieData = movieResponse.data.results[0];
      return movieData;
    });

    const movies = await Promise.all(moviePromises);
    setRecommendedMovies(movies);
    setLoading(false);
  }

  return (
    <Flex w="100%" direction="column" padding={['0 1rem', '0 3rem', '0 6rem']}>
      <Flex align="center" direction={'row'} justifyContent="space-between">
        <VStack spacing={1} align="baseline">
          <Heading>Recomendados</Heading>
          <Text variant="subtitle">
            Gerado pelo ChatGPT a partir da sua lista de favoritos
          </Text>
        </VStack>
        <Button
          isLoading={loading}
          onClick={handleGenerateRecommendations}
          fontWeight="light"
          borderRadius={'full'}
          colorScheme="purple"
        >
          <FaMagic />
        </Button>
      </Flex>

      <Flex
        gap={{ base: '1.25rem', md: '5rem' }}
        direction={{ base: 'column', md: 'row' }}
      >
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie, index) => (
            <Box paddingTop={{ base: '1.25rem', md: '2.75rem' }} key={index}>
              <MovieCard movie={movie} />
            </Box>
          ))
        ) : (
          <Center w="100%" h="6.25rem">
            <Heading size="md">Nada por aqui, ainda... </Heading>
          </Center>
        )}
      </Flex>
    </Flex>
  );
};

export default RecommendedMovies;