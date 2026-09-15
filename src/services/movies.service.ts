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

export async function getMovieShowtimes(filmId: number): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/films/${filmId}/screenings`);
    if (!response.ok) {
      console.error(`Errore nel caricamento degli spettacoli per il film ${filmId}: ${response.status}`);
      return [];
    }
    const screenings = await response.json();
    return screenings;
  } catch (error) {
    console.error("Errore di rete durante il recupero degli spettacoli:", error);
    return [];
  }
}

import type { BookingRequest, Booking } from '../types/movie';

export async function createBooking(screeningId: number, data: BookingRequest): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}/screenings/${screeningId}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.error ?? `Errore nella prenotazione (status ${response.status})`;
    throw new Error(message);
  }

  return response.json();
}