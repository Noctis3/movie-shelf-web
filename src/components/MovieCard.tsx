import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import tmdbLogo from '../assets/images/tmdb.png';

interface MovieCardProps {
  imageUrl: string;
  release: string;
  title: string;
  overview: string;
  rating: number;
  genres: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imageUrl,
  release,
  title,
  overview,
  rating,
  genres,
}) => {
  return (
    <Flex
      direction={{ base: 'row', md: 'column' }}
      minW={{ base: '11rem', md: '16rem' }}
      h={{ base: 'auto', md: '30rem' }}
      gap={{ base: '1rem' }}
    >
      <Image
        w={{ base: '11rem', md: '16rem' }}
        h={{ base: '17.6rem', md: '24rem' }}
        align="center"
        objectFit="cover"
        src={imageUrl}
        borderRadius="1rem"
      />
      <VStack
        spacing=".5rem"
        align="start"
        mt={{ base: '0rem', md: '0.75rem' }}
        w="100%"
      >
        <Text variant="subtitle">{release}</Text>
        <Heading as="h4" size="sm" noOfLines={1}>
          {title}
        </Heading>
        <HStack>
          <Image src={tmdbLogo} />
          <Text fontSize="xs">{rating} / 100</Text>
        </HStack>
        <Text noOfLines={1} overflow="hidden" variant="subtitle">
          {genres}
        </Text>
        <Text
          h="100%"
          maxH="8rem"
          variant="subtitle"
          color="black"
          overflow={'hidden'}
          display={{ base: 'flex', md: 'none' }}
        >
          {overview}
        </Text>
      </VStack>
    </Flex>
  );
};

export default MovieCard;
