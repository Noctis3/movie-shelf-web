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
    <Box
      w="100%"
      h={['23rem', '23rem', '38rem']}
      position="relative"
      cursor="pointer"
    >
      <Image
        src={imageUrl}
        alt="Product Image"
        objectFit="cover"
        w="100%"
        h="100%"
        filter="auto"
        brightness="50%"
      />
      <Flex
        direction="column"
        position="absolute"
        bottom="0"
        paddingLeft="40px"
        w="100%"
        h="70%"
        overflow="hidden"
        gap="1rem"
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
    </Box>
  );
};
export default MovieBanner;
