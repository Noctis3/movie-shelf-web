import { Box, Flex, HStack, Heading } from '@chakra-ui/layout';
import { MovieData, genres } from '../types/movies';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GET_MOVIE_LIST } from '../types/requests';
import { FaChevronRight } from 'react-icons/fa';
import { Button } from '@chakra-ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';

interface MoviesSwipeProps {
  movieList: MovieData[];
  sectionTitle: string;
}

const MoviesSwipe: React.FC<MoviesSwipeProps> = ({
  movieList,
  sectionTitle,
}) => {
  return (
    <Flex
      w="100%"
      gap={{ base: '1.25rem', md: '2.75rem' }}
      direction="column"
      padding={['0 1rem', '0 3rem', '0 6rem']}
    >
      <Heading>{sectionTitle}</Heading>
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          1: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 5,
          },

          1240: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1500: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Scrollbar, Navigation, Autoplay]}
        style={{ width: '100%' }}
      >
        {movieList.map((movie, i) => {
          return (
            <SwiperSlide key={i}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};

export default MoviesSwipe;
