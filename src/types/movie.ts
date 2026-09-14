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