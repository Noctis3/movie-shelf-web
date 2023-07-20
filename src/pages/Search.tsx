import { useContext } from 'react';
import { MovieContext } from '../contexts/movies';
import MovieCard from '../components/MovieCard';
import { genres } from '../types/movies';
import { Wrap, WrapItem } from '@chakra-ui/layout';

export const MovieSearch = () => {
  const { movieResultsList } = useContext(MovieContext);
  console.log(movieResultsList);
  return (
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
          <WrapItem>
            <MovieCard
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              release={releaseYear}
              genres={genreNames}
              rating={rating}
            />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
