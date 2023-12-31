import { useTranslation } from 'react-i18next';

export const CREATE_REQUEST_TOKEN = 'authentication/token/new';
export const VALIDATE_REQUEST_TOKEN =
  'authentication/token/validate_with_login';
export const CREATE_SESSION = 'authentication/session/new';
export const GET_ACCOUNT_DETAILS = 'account';
export const GET_MOVIE_LIST = 'discover/movie';

const languageMap: { [key: string]: string } = {
  pt: 'pt-BR',
  es: 'es',
  en: 'en-US',
};

function getSelectedLanguage(language: string) {
  return languageMap[language] || language;
}
export function getUserPicture(path: string | null) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}

export function searchMovies(query: string, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `search/movie?query=${query}&language=${selectedLanguage}`;
}

export function getMovieDetails(id: string, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `movie/${id}?language=${selectedLanguage}`;
}

export function getMovieBanner(backdrop_path: string) {
  return `https://image.tmdb.org/t/p/original${backdrop_path}`;
}

export function getMoviePoster(poster_path: string) {
  return `https://image.tmdb.org/t/p/w400${poster_path}`;
}
export function getProviders(id: string, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `movie/${id}/watch/providers?language=${selectedLanguage}`;
}
export function getProvidersLogo(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

export function getCredits(id: string, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `movie/${id}/credits?language=${selectedLanguage}`;
}

export function getActorImage(path: string) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}

export function getFavorites(user_id: number, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `account/${user_id}/favorite/movies?language=${selectedLanguage}`;
}

export function addFavorite(user_id: number) {
  return `account/${user_id}/favorite`;
}

export function getVideos(id: string, language: string) {
  const selectedLanguage = getSelectedLanguage(language);
  return `movie/${id}/videos?language=${selectedLanguage}`;
}
