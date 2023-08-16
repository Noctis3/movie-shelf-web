import { VStack } from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { api, openai } from '../services/api';
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
import RecommendedMovies from '../components/RecommendedMovies';

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const [movieBanner, setMovieBanner] = useState<MovieData>({} as MovieData);
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);
  const favoriteTitles = favoriteMovies.map((movie) => movie.title);
  const limitedMovieList = movieList.slice(1, 6);

  useEffect(() => {
    async function getData() {
      const movieListResponse = await api.get(
        `${GET_MOVIE_LIST}?language=pt-BR`
      );
      setMovieBanner(movieListResponse.data.results[0]);
      setMovieList(movieListResponse.data.results);

      const favoritesResponse = await api.get(getFavorites(user.id), {
        params: { session_id: user.sessionId },
      });
      setFavoriteMovies(favoritesResponse.data.results);
    }
    getData();
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

        {favoriteMovies.length > 0 && (
          <MoviesSwipe movieList={favoriteMovies} sectionTitle="Favoritos" />
        )}

        <RecommendedMovies movieList={favoriteTitles} />
      </VStack>
    </>
  );
};
