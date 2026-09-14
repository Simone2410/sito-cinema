import type { Movie, MovieDetail, Showtime } from '../types/movie';

const API_BASE_URL = 'https://its-cinema.vercel.app/api';

export async function getMoviesInProgrammazione(): Promise<Movie[]> {
  const response = await fetch(`${API_BASE_URL}/films`);

  if (!response.ok) {
    throw new Error(`Errore nel caricamento dei film (status ${response.status})`);
  }

  return response.json();
}

export async function getMovieById(id: number): Promise<MovieDetail> {
  const response = await fetch(`${API_BASE_URL}/films/${id}`);

  if (!response.ok) {
    throw new Error(`Errore nel recupero dei dettagli del film (status ${response.status})`);
  }

  return response.json();
}

export async function getMovieShowtimes(filmId: number): Promise<Showtime[]> {
  try {
    // Proviamo l'endpoint primario
    const response = await fetch(`${API_BASE_URL}/films/${filmId}/showtimes`);

    if (!response.ok) {
      // Qualora l'API accetti un query param tipo /showtimes?filmId=...
      const altResponse = await fetch(`${API_BASE_URL}/showtimes?filmId=${filmId}`);
      if (!altResponse.ok) return [];
      return altResponse.json();
    }

    return response.json();
  } catch (error) {
    console.warn("Impossibile recuperare gli spettacoli:", error);
    return []; // Ritorna un array vuoto anziché far fallire la pagina
  }
}