import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { MovieData } from '../types/movies';
import api from '../services/api';

type MovieProviderProps = {
  children: ReactNode;
};

type MovieContextData = {
  movieResultsList: MovieData[];
  searchMovie: (query: string) => Promise<void>;
};

export const MovieContext = createContext({} as MovieContextData);

export function MovieProvider({ children }: MovieProviderProps) {
  const [movieResultsList, setMovieResultsList] = useState<MovieData[]>([]);

  const saveToLocalStorage = (data: MovieData[]) => {
    localStorage.setItem('movieResultsList', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem('movieResultsList');
    return storedData ? JSON.parse(storedData) : [];
  };

  useEffect(() => {
    const storedMovieResults = loadFromLocalStorage();
    setMovieResultsList(storedMovieResults);
  }, []);

  const searchMovie = async (query: string) => {
    try {
      const response = await api.get(
        `search/movie?query=${query}&language=pt-BR`
      );
      setMovieResultsList(response.data.results);
      saveToLocalStorage(response.data.results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <MovieContext.Provider value={{ movieResultsList, searchMovie }}>
      {children}
    </MovieContext.Provider>
  );
}
