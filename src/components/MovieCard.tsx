import React from 'react';
import { Box, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import tmdbLogo from '../assets/images/tmdb.png';

interface MovieCardProps {
  imageUrl: string;
  release: string;
  title: string;
  rating: number;
  genres: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imageUrl,
  release,
  title,
  rating,
  genres,
}) => {
  return (
    <Box w="14rem" h="30rem">
      <Image
        w="100%"
        h="20rem"
        align="center"
        objectFit="cover"
        src={imageUrl}
        borderRadius="1rem"
      />
      <VStack spacing=".5rem" align="start" mt="0.75rem">
        <Text variant="subtitle">{release}</Text>
        <Heading as="h4" size="sm">
          {title}
        </Heading>
        <HStack>
          <Image src={tmdbLogo} />
          <Text fontSize="xs">{rating} / 100</Text>
        </HStack>
        <Text variant="subtitle">{genres}</Text>
      </VStack>
    </Box>
  );
};

export default MovieCard;
