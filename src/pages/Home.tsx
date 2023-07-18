import { Button, ButtonGroup, HStack, Heading, VStack } from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import api from '../services/api';
import { GET_MOVIE_LIST } from '../types/requests';
import MovieBanner from '../components/MovieBanner';
import { genres, MovieData } from '../types/movies';

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const [movieBanner, setMovieBanner] = useState<MovieData>({} as MovieData);
  const limitedMovieList = movieList.slice(1, 8);

  useEffect(() => {
    api.get(`${GET_MOVIE_LIST}?language=pt-BR`).then((response) => {
      setMovieList(response.data.results);
      setMovieBanner(response.data.results[0]);
    });
  }, []);

  return (
    <>
      <ColorModeSwitcher />
      <Heading>Olá {user.username}</Heading>
      <Button onClick={signOut}>sair</Button>
      <MovieBanner
        imageUrl={`https://image.tmdb.org/t/p/original${movieBanner.backdrop_path}`}
        title={movieBanner.title}
        subtitle={movieBanner.overview}
        rating={movieBanner.vote_average * 10}
      />

      {/* <HStack spacing={'3rem'} w="auto">
        {limitedMovieList.map((movie, i) => {
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
      </HStack> */}
    </>
  );
};
