import { Button, ButtonGroup, HStack, Heading, VStack } from '@chakra-ui/react';
import { AuthContext } from '../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import api from '../services/api';
import { GET_MOVIE_LIST } from '../types/requests';
import MovieBanner from '../components/MovieBanner';
import { genres, MovieData } from '../types/movies';
import MoviesSwipe from '../components/MoviesSwipe';
import Header from '../components/Header';

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const [movieBanner, setMovieBanner] = useState<MovieData>({} as MovieData);
  const [movieList, setMovieList] = useState<MovieData[]>([]);
  const limitedMovieList = movieList.slice(1, 6);
  const recommendedMovieList = movieList.slice(7, 12);

  useEffect(() => {
    api.get(`${GET_MOVIE_LIST}?language=pt-BR`).then((response) => {
      setMovieBanner(response.data.results[0]);
      setMovieList(response.data.results);
    });
  }, []);

  return (
    <>
      <Header />
      <MovieBanner
        imageUrl={`https://image.tmdb.org/t/p/original${movieBanner.backdrop_path}`}
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
      </VStack>
    </>
  );
};
