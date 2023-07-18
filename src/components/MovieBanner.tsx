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
import tmdbLogo from '../assets/images/tmdb.png';
import { AiFillPlayCircle } from 'react-icons/ai';
import Header from './Header';

interface MovieBannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  rating: number;
}

const MovieBanner: React.FC<MovieBannerProps> = ({
  imageUrl,
  title,
  subtitle,
  rating,
}) => {
  return (
    <Flex
      w="100%"
      h={['23rem', '23rem', '38rem']}
      backgroundImage={imageUrl}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      justifyContent="space-between"
      direction="column"
      cursor="pointer"
    >
      <Header />
      <Flex
        direction="column"
        justifyContent="center"
        padding={['0 1rem', '0 2rem', '0 6rem']}
        w="100%"
        h="100%"
        overflow="hidden"
        gap="1rem"
        bgGradient={
          'linear-gradient(90deg, rgba(0,0,0,0.5130427170868348) 0%, rgba(0,0,0,0.5130427170868348) 100%)'
        }
      >
        <Heading lineHeight="shorter" as="h2" size="3xl" color="white">
          {title}
        </Heading>
        <VStack align="start" w="40%" gap="1rem">
          <HStack>
            <Image src={tmdbLogo} />
            <Text fontSize="xs" color="white">
              {rating} / 100
            </Text>
          </HStack>
          <Text color="white">{subtitle}</Text>
          <Button colorScheme="purple" leftIcon={<AiFillPlayCircle />}>
            ASSISTIR TRAILER
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};
export default MovieBanner;
