const JIKAN_BASE_URL = "https://api.jikan.moe/v4";
const APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
  animeSearch: `${JIKAN_BASE_URL}/anime`,
  topAnime: `${JIKAN_BASE_URL}/top/anime`,
  login: `${APP_API_BASE_URL}/auth/login`,
  register: `${APP_API_BASE_URL}/auth/register`,
};

export const API_DEFAULTS = {
  animeLimit: 25,
};
