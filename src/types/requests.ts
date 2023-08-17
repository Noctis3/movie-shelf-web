export const CREATE_REQUEST_TOKEN = 'authentication/token/new';
export const VALIDATE_REQUEST_TOKEN =
  'authentication/token/validate_with_login';
export const CREATE_SESSION = 'authentication/session/new';
export const GET_ACCOUNT_DETAILS = 'account';
export const GET_MOVIE_LIST = 'discover/movie';

export function getUserPicture(path: string | null) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}

export function searchMovies(query: string) {
  return `search/movie?query=${query}&language=pt-BR`;
}

export function getMovieDetails(id: string) {
  return `movie/${id}?language=pt-BR`;
}

export function getMovieBanner(backdrop_path: string) {
  return `https://image.tmdb.org/t/p/original${backdrop_path}`;
}

export function getMoviePoster(poster_path: string) {
  return `https://image.tmdb.org/t/p/w400${poster_path}`;
}
export function getProviders(id: string) {
  return `movie/${id}/watch/providers?language=pt-BR`;
}
export function getProvidersLogo(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

export function getCredits(id: string) {
  return `movie/${id}/credits?language=pt-BR`;
}

export function getActorImage(path: string) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}

export function getFavorites(user_id: number) {
  return `account/${user_id}/favorite/movies?language=pt-BR`;
}

export function addFavorite(user_id: number) {
  return `account/${user_id}/favorite`;
}

export function getVideos(id: string) {
  return `movie/${id}/videos?language=pt-BR`;
}
