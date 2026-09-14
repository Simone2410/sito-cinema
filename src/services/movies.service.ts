import type { Movie } from '../types/movie';

const API_BASE_URL = 'https://its-cinema.vercel.app/api';

export async function getMoviesInProgrammazione(): Promise<Movie[]> {
  const response = await fetch(`${API_BASE_URL}/films`);

  if (!response.ok) {
    throw new Error(`Errore nel caricamento dei film (status ${response.status})`);
  }

  return response.json();
}