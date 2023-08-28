import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { MovieData, genres } from '../types/movies';
import { Wrap, WrapItem, Heading, Box, Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import Header from '../components/Header';
import { searchMovies } from '../types/requests';
import { useTranslation } from 'react-i18next';

export const MovieSearch = () => {
  const { t, i18n } = useTranslation();
  const [movieResultsList, setMovieResultsList] = useState<MovieData[]>([]);
  const [activeGenreId, setActiveGenreId] = useState(0);
  let { search } = useParams();

  useEffect(() => {
    const fetchMovieResults = async () => {
      try {
        const response = await api.get(searchMovies(search!, i18n.language));
        setMovieResultsList(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovieResults();
  }, [search]);

  const handleGenre = (genreId: number) => {
    genreId === activeGenreId ? setActiveGenreId(0) : setActiveGenreId(genreId);
  };

  return (
    <>
      <Header />
      {/* {genres.map((genre) => (
        <Button
          onClick={() => handleGenre(genre.id)}
          isActive={activeGenreId === genre.id}
          key={genre.id}
          variant="genre"
          mr="4"
          mt="4"
        >
          {genre.name}
        </Button>
      ))} */}
      <Flex
        direction="column"
        gap="1rem"
        padding={['1rem 1rem', '1rem 2rem', '1rem 6rem']}
      >
        <Heading size={{ md: 'lg', base: 'md' }}>
          Resultado para "{search}"
        </Heading>
        <Wrap spacing="1.875rem" justify="center">
          {movieResultsList.map((movie, i) => {
            return (
              <div key={i}>
                <WrapItem>
                  <MovieCard movie={movie} />
                </WrapItem>
              </div>
            );
          })}
        </Wrap>
      </Flex>
    </>
  );
};
