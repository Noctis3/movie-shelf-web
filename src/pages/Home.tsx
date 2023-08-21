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
import RecommendedMovies from '../components/RecommendedMovies';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const [movieBanner, setMovieBanner] = useState<MovieData>({} as MovieData);
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);
  const favoriteTitles = favoriteMovies.map((movie) => movie.title);
  const limitedMovieList = movieList.slice(1, 10);

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

      <VStack
        marginTop={{ base: '1.1rem', md: '5rem' }}
        spacing={{ base: '1rem', md: '2rem' }}
      >
        <MoviesSwipe
          movieList={limitedMovieList}
          sectionTitle={t('homePage.releases')}
        />

        {favoriteMovies.length > 0 && (
          <MoviesSwipe
            movieList={favoriteMovies}
            sectionTitle={t('homePage.favorites')}
          />
        )}

        <RecommendedMovies movieList={favoriteTitles} />
      </VStack>
    </>
  );
};
