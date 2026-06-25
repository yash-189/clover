import { apiRequest } from "./client";
import { API_DEFAULTS, API_ENDPOINTS } from "../config/api";

function mapAnime(anime) {
  return {
    id: anime.mal_id,
    title: anime.title || "Not available",
    image:
      anime.images?.webp?.image_url ||
      anime.images?.jpg?.image_url ||
      "",
    largeImage:
      anime.images?.webp?.large_image_url ||
      anime.images?.jpg?.large_image_url ||
      anime.images?.webp?.image_url ||
      anime.images?.jpg?.image_url ||
      "",
    link: anime.url || "",
    trailerLink: anime.trailer?.url || anime.url || "",
    synopsis: anime.synopsis || "Synopsis is not available right now.",
    score: anime.score ?? "N/A",
    episodes: anime.episodes ?? "N/A",
    status: anime.status || "Unknown",
    type: anime.type || "Anime",
    genres: Array.isArray(anime.genres) ? anime.genres.map((genre) => genre.name) : [],
  };
}

export async function fetchSearchResults(query) {
  const params = new URLSearchParams({
    q: query,
    limit: String(API_DEFAULTS.animeLimit),
  });

  const data = await apiRequest(`${API_ENDPOINTS.animeSearch}?${params.toString()}`);
  return Array.isArray(data.data) ? data.data.map(mapAnime) : [];
}

export async function fetchTopAnime() {
  const params = new URLSearchParams({
    limit: String(API_DEFAULTS.animeLimit),
  });

  const data = await apiRequest(`${API_ENDPOINTS.topAnime}?${params.toString()}`);
  return Array.isArray(data.data) ? data.data.map(mapAnime) : [];
}
