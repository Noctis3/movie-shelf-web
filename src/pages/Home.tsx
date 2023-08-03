import { VStack } from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  GET_MOVIE_LIST,
  getFavorites,
  getMovieBanner,
} from '../types/requests';
import MovieBanner from '../components/MovieBanner';
import { MovieData } from '../types/movies';
import MoviesSwipe from '../components/MoviesSwipe';
import Header from '../components/Header';
import Movie from './Movie';

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const [movieBanner, setMovieBanner] = useState<MovieData>({} as MovieData);
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);
  const limitedMovieList = movieList.slice(1, 6);
  const recommendedMovieList = movieList.slice(7, 12);

  useEffect(() => {
    api.get(`${GET_MOVIE_LIST}?language=pt-BR`).then((response) => {
      setMovieBanner(response.data.results[0]);
      setMovieList(response.data.results);
    });
    console.log(user.id);
    api
      .get(getFavorites(user.id), { params: { session_id: user.sessionId } })
      .then((response) => {
        console.log(response.data);
        setFavoriteMovies(response.data.results);
      });
  }, []);

  return (
    <>
      <Header />
      <MovieBanner
        id={movieBanner.id}
        imageUrl={getMovieBanner(movieBanner.backdrop_path)}
        title={movieBanner.title}
        subtitle={movieBanner.overview}
        rating={movieBanner.vote_average * 10}
      />

      <VStack marginTop={{ base: '1.1rem', md: '5rem' }} spacing="6rem">
        <MoviesSwipe movieList={limitedMovieList} sectionTitle="Lançamentos" />
        <MoviesSwipe
          movieList={recommendedMovieList}
          sectionTitle="Recomendações"
        />
        {favoriteMovies.length > 0 && (
          <MoviesSwipe movieList={favoriteMovies} sectionTitle="Favoritos" />
        )}
      </VStack>
    </>
  );
};
