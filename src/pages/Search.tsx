import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { MovieData, genres } from '../types/movies';
import { Wrap, WrapItem, Center } from '@chakra-ui/layout';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';
import { Button } from '@chakra-ui/react';

export const MovieSearch = () => {
  const [movieResultsList, setMovieResultsList] = useState<MovieData[]>([]);
  const [activeGenreId, setActiveGenreId] = useState(0);
  let { search } = useParams();

  useEffect(() => {
    const fetchMovieResults = async () => {
      try {
        const response = await api.get(
          `search/movie?query=${search}&language=pt-BR`
        );
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
          const movieGenres = movie.genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return genre ? genre.name : '';
          });
          const genreNames = movieGenres.join(', ');
          const releaseYear = movie.release_date.split('-')[0];
          const rating = Number((movie.vote_average * 10).toFixed(0));

          return (
            <div key={i}>
              <WrapItem>
                <MovieCard
                  title={movie.title}
                  overview={movie.overview}
                  imageUrl={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  release={releaseYear}
                  genres={genreNames}
                  rating={rating}
                />
              </WrapItem>
            </div>
          );
        })}
      </Wrap>
    </>
  );
};
