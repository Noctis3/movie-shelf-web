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
  genres,
} from '../types/movies';
import {
  getActorImage,
  getCredits,
  getMovieBanner,
  getMovieDetails,
  getMoviePoster,
  getProviders,
  getProvidersLogo,
} from '../types/requests';
import tmdbLogo from '../assets/images/tmdb.png';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

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
  return (
    <Flex
      direction="column"
      gap="1rem"
      padding={{ base: '0 1rem', md: '0 10rem' }}
    >
      <Heading>Elenco</Heading>
      <Flex gap={{ base: '1.5rem', md: '1rem' }} wrap="wrap">
        {cast.map((actor, i) => {
          return <ActorCard key={i} actor={actor} />;
        })}
      </Flex>
    </Flex>
  );
};

const Movie: React.FC = () => {
  const movieId = useParams();
  const [movie, setMovie] = useState<MovieDataById>({} as MovieDataById);
  const [movieProviders, setMovieProviders] = useState<MovieProviderData[]>([]);
  const [cast, setCast] = useState<CastData[]>([]);
  const [director, setDirector] = useState<CrewData[]>([]);
  const genreNames = movie.genres?.map((genre) => genre.name).join(', ');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(getMovieDetails(movieId.id!));
        const providersResponse = await api.get(getProviders(movieId.id!));
        const creditsResponse = await api.get(getCredits(movieId.id!));
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
              <Button leftIcon={<FaRegHeart />} colorScheme="yellow">
                Favoritar
              </Button>
            </HStack>
            <VStack spacing="0" align={'flex-start'}>
              <Text fontSize="xl" fontWeight="bold">
                Sinopse
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
                  Diretor
                </Text>
                <Text>{director[0]?.name}</Text>
              </VStack>
              <VStack spacing="0" align={'flex-start'}>
                <Text fontSize="xl" fontWeight="bold">
                  Orçamento
                </Text>
                <Text>US$ {movie.budget?.toLocaleString()}</Text>
              </VStack>
            </HStack>
            <VStack spacing=".5rem" align={'flex-start'}>
              <Text fontSize="xl" fontWeight="bold">
                Disponível em:
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
                  <Text>Não disponível</Text>
                )}
                {}
              </HStack>
            </VStack>
          </Flex>
        </Flex>
        <CastRow cast={cast?.slice(0, 6)} />
      </Flex>
    </>
  );
};

export default Movie;
