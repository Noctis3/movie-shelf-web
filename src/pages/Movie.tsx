/* eslint-disable jsx-a11y/iframe-has-title */
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  CastData,
  CrewData,
  MovieData,
  MovieDataById,
  MovieProviderData,
  VideoData,
  genres,
} from '../types/movies';
import {
  getActorImage,
  getCredits,
  getFavorites,
  getMovieBanner,
  getMovieDetails,
  getMoviePoster,
  getProviders,
  getProvidersLogo,
  getVideos,
} from '../types/requests';
import tmdbLogo from '../assets/images/tmdb.png';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { api } from '../services/api';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../contexts/auth';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const ActorCard: React.FC<{ actor: CastData }> = ({ actor }) => {
  return (
    <Flex direction="column" align="center" w={{ base: '10rem', md: '15rem' }}>
      <Image
        boxSize={{ base: '10rem', md: '15rem' }}
        objectFit="cover"
        align="center"
        src={getActorImage(actor.profile_path)}
      />
      <Box mt="1rem" alignItems="flex-start" w="100%">
        <Heading size="md">{actor?.name}</Heading>
        <Text>{actor?.character}</Text>
      </Box>
    </Flex>
  );
};

const CastRow: React.FC<{ cast: CastData[] }> = ({ cast }) => {
  const { t } = useTranslation();
  return (
    <Flex
      direction="column"
      gap="1rem"
      padding={{ base: '0 1rem', md: '0 10rem' }}
    >
      <Heading>{t('moviePage.cast')}</Heading>
      <Flex gap={{ base: '1.5rem', md: '1rem' }} wrap="wrap">
        {cast.map((actor, i) => {
          return <ActorCard key={i} actor={actor} />;
        })}
      </Flex>
    </Flex>
  );
};

const FavoriteButton: React.FC<{ movieID: number }> = ({ movieID }) => {
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const isFavorite = async () => {
      try {
        const response = await api.get(getFavorites(user.id));
        const movieIDList = response.data.results.map(
          (movie: MovieData) => movie.id
        );
        setIsFavorite(movieIDList.includes(movieID) ? true : false);
      } catch (error) {
        console.error(error);
      }
    };

    isFavorite();
  }, [isFavorite, movieID, user.id]);
  const addFavorite = async () => {
    try {
      const response = await api.post(`account/${user.id}/favorite`, {
        media_type: 'movie',
        media_id: movieID,
        favorite: isFavorite ? false : true,
      });
      console.log(response.data.status_message);
      setIsFavorite(!isFavorite);
      // adicionar toast
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      onClick={addFavorite}
      leftIcon={isFavorite ? <FaHeart /> : <FaRegHeart />}
      colorScheme="yellow"
    >
      {isFavorite
        ? t('moviePage.favoriteButton.remove')
        : t('moviePage.favoriteButton.add')}
    </Button>
  );
};

const TrailerCard: React.FC<{ video: VideoData }> = ({ video }) => {
  const movieId = useParams();

  return (
    <Flex direction="column" gap="1rem">
      <Flex
        w="18rem"
        h="10rem"
        bgPosition={'center'}
        objectFit={'cover'}
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        borderRadius="1rem"
        _hover={{
          transition: 'all .3s ease-in-out',
          filter: 'brightness(0.8)',
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.key}`}
        />
      </Flex>
      <Heading size={'md'}>{video.type}</Heading>
    </Flex>
  );
};

const VideosRow: React.FC<{ videos: VideoData[] }> = ({ videos }) => {
  return (
    <Flex
      direction="column"
      gap="1rem"
      padding={{ base: '0 1rem', md: '0 10rem' }}
    >
      <Heading>Videos</Heading>
      <Flex gap={{ base: '1.5rem', md: '1rem' }} wrap="wrap">
        {videos.map((video, i) => {
          return <TrailerCard key={i} video={video} />;
        })}
      </Flex>
    </Flex>
  );
};
const Movie: React.FC = () => {
  const { t } = useTranslation();
  const movieId = useParams();
  const [movie, setMovie] = useState<MovieDataById>({} as MovieDataById);
  const [movieProviders, setMovieProviders] = useState<MovieProviderData[]>([]);
  const [cast, setCast] = useState<CastData[]>([]);
  const [director, setDirector] = useState<CrewData[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const genreNames = movie.genres?.map((genre) => genre.name).join(', ');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(getMovieDetails(movieId.id!));
        const providersResponse = await api.get(getProviders(movieId.id!));
        const creditsResponse = await api.get(getCredits(movieId.id!));
        const videosResponse = await api.get(getVideos(movieId.id!));
        console.log(videosResponse.data);
        setVideos(videosResponse.data.results);
        setCast(creditsResponse.data.cast);
        setDirector(
          creditsResponse.data.crew.filter(
            (member: CrewData) => member.job === 'Director'
          )
        );
        setMovie(response.data);
        if (providersResponse.data.results.BR) {
          setMovieProviders(providersResponse.data.results.BR.flatrate);
        } else {
          setMovieProviders([]);
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <>
      <Header />
      <Flex direction="column" gap="2rem">
        {movie.backdrop_path && (
          <Image
            h={{ base: '15rem', md: '20rem' }}
            w="100%"
            src={getMovieBanner(movie.backdrop_path)}
            objectFit={'cover'}
            align={'center'}
          />
        )}
        <Flex w="100%" gap="3rem" padding={{ base: '0 1rem', md: '0 10rem' }}>
          {movie.poster_path && (
            <Image
              display={{ base: 'none', md: 'flex' }}
              src={getMoviePoster(movie.poster_path)}
              w="20rem"
              h={{ base: '17.6rem', md: '28rem' }}
              align="center"
              objectFit="cover"
              borderRadius="1rem"
            />
          )}
          <Flex
            flex={1}
            gap="1rem"
            direction="column"
            justify="center"
            align={'flex-start'}
          >
            <VStack spacing={'0'} align={'flex-start'}>
              <Heading size="2xl">{movie.title}</Heading>
              <Text variant="subtitle">{genreNames}</Text>
            </VStack>
            <HStack w="100%" justify="space-between" spacing={'3rem'}>
              <HStack>
                <Image src={tmdbLogo} />
                <Text fontSize="xs">
                  {(movie.vote_average * 10).toFixed(0)} / 100
                </Text>
              </HStack>
              <FavoriteButton movieID={movie.id} />
            </HStack>
            <VStack spacing="0" align={'flex-start'}>
              <Text fontSize="xl" fontWeight="bold">
                {t('moviePage.synopsis')}
              </Text>
              <Text w={{ base: '100%', md: '80%' }}>{movie.overview}</Text>
            </VStack>
            <HStack
              spacing="5rem"
              justify={{ base: 'space-between', md: 'normal' }}
              w="100%"
            >
              <VStack spacing="0" align={'flex-start'}>
                <Text fontSize="xl" fontWeight="bold">
                  {t('moviePage.director')}
                </Text>
                <Text>{director[0]?.name}</Text>
              </VStack>
              <VStack spacing="0" align={'flex-start'}>
                <Text fontSize="xl" fontWeight="bold">
                  {t('moviePage.budget')}
                </Text>
                <Text>US$ {movie.budget?.toLocaleString()}</Text>
              </VStack>
            </HStack>
            <VStack spacing=".5rem" align={'flex-start'}>
              <Text fontSize="xl" fontWeight="bold">
                {t('moviePage.available')}
              </Text>
              <HStack>
                {movieProviders.length !== 0 ? (
                  movieProviders.map((provider, i) => {
                    return (
                      <Image
                        boxSize="3rem"
                        key={i}
                        src={getProvidersLogo(provider.logo_path)}
                      />
                    );
                  })
                ) : (
                  <Text>{t('moviePage.notAvailable')}</Text>
                )}
                {}
              </HStack>
            </VStack>
          </Flex>
        </Flex>
        <CastRow cast={cast?.slice(0, 6)} />
        <VideosRow videos={videos} />
      </Flex>
    </>
  );
};

export default Movie;
