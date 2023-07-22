import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import api from '../services/api';

interface TrailerCardProps {
  id: number;
}

const TrailerCard: React.FC<TrailerCardProps> = ({ id }) => {
  const trailerImage = `https://i3.ytimg.com/vi/IJilkMPqvs0/hqdefault.jpg`;
  // const trailerImage = `https://i3.ytimg.com/vi/${trailerKey}/hqdefault.jpg`;

  const handleTrailer = () => {
    // const linkToTrailer = `https://www.youtube.com/watch?v=${trailer[0].key}`;
    const linkToTrailer = `https://www.youtube.com/watch?v=IJilkMPqvs0`;
    window.open(linkToTrailer);
  };

  return (
    <Flex direction="column" gap="1rem">
      <Flex
        w="28rem"
        h="15rem"
        bgImage={trailerImage}
        bgPosition={'center'}
        objectFit={'cover'}
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        onClick={handleTrailer}
        borderRadius="1rem"
        _hover={{
          transition: 'all .3s ease-in-out',
          filter: 'brightness(0.8)',
        }}
      >
        <AiOutlinePlayCircle size="4rem" color="white" />
      </Flex>
      <Heading size={'md'}>Trailer</Heading>
    </Flex>
  );
};

export default TrailerCard;
