import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  VStack,
} from '@chakra-ui/react';
import tmdbLogo from '../assets/images/tmdb.png';
import { AiFillPlayCircle } from 'react-icons/ai';
import Header from './Header';
import api from '../services/api';
import { useState } from 'react';

interface MovieBannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  rating: number;
  id: number;
}

const MovieBanner: React.FC<MovieBannerProps> = ({
  imageUrl,
  title,
  subtitle,
  rating,
  id,
}) => {
  async function handleSearchVideo(event: React.MouseEvent<HTMLButtonElement>) {
    try {
      const response = await api.get(`movie/${id}/videos?language=pt-BR`);
      const videos = response.data.results;
      const trailer = videos.filter((video: any) => video.type === 'Trailer');
      const linkToTrailer = `https://www.youtube.com/watch?v=${trailer[0].key}`;
      window.open(linkToTrailer);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return (
    <Flex
      h={['17rem', '23rem', '38rem']}
      borderRadius={['1rem', '0rem', '0rem']}
      margin={['1rem', '0rem']}
      backgroundImage={imageUrl}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      justifyContent="space-between"
      direction="column"
      cursor="pointer"
    >
      <Flex
        borderRadius={['1rem', '0rem', '0rem']}
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
        <Heading
          lineHeight="shorter"
          as="h2"
          size={['md', 'xl', '3xl']}
          color="white"
          noOfLines={1}
        >
          {title}
        </Heading>
        <Stack
          direction={['column-reverse', 'column-reverse', 'column']}
          align="start"
          w={['70%', '55%', '50%', '40%']}
          gap="1rem"
        >
          <HStack>
            <Image src={tmdbLogo} />
            <Text fontSize="xs" color="white">
              {rating} / 100
            </Text>
          </HStack>
          <Text
            h={['5rem', '6rem', '7rem']}
            noOfLines={5}
            overflow="hidden"
            color="white"
          >
            {subtitle}
          </Text>
        </Stack>
        <Button
          fontSize={['xs', 'sm', 'md']}
          onClick={handleSearchVideo}
          w="min-content"
          colorScheme="purple"
          leftIcon={<AiFillPlayCircle />}
        >
          ASSISTIR TRAILER
        </Button>
      </Flex>
    </Flex>
  );
};
export default MovieBanner;
