export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;        // minuti
  director: string;
  description: string;
  poster_url: string | null;
  year: number;
  rating: string;           // es. "T", "VM14", "VM18"
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
}

export interface Showtime {
  id: number;
  film_id: number;
  room_id: number;
  start_time: string;       // es. "2026-05-12T15:00:00.000Z"
  booked_seats: number;
  room: Room;
}

// Interfaccia per la risposta completa del dettaglio film con gli spettacoli
export interface MovieDetail extends Movie {
  showtimes?: Showtime[];
}