import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { MovieData, genres } from '../types/movies';
import { Wrap, WrapItem } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import Header from '../components/Header';
import { Button } from '@chakra-ui/react';
import { searchMovies } from '../types/requests';

export const MovieSearch = () => {
  const [movieResultsList, setMovieResultsList] = useState<MovieData[]>([]);
  const [activeGenreId, setActiveGenreId] = useState(0);
  let { search } = useParams();

  useEffect(() => {
    const fetchMovieResults = async () => {
      try {
        const response = await api.get(searchMovies(search!));
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
      {genres.map((genre) => (
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
      ))}
      <Wrap spacing="1.875rem">
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
    </>
  );
};
