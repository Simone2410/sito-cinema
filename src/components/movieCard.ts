import type { Movie } from '../types/movie';

const FALLBACK_POSTER = 'https://placehold.co/300x445?text=No+Poster';

export function renderMovieCard(movie: Movie): string {
  const poster = movie.poster_url ?? FALLBACK_POSTER;

  return `
    <article class="movie-card">
      <div class="movie-poster">
        <img src="${poster}" alt="Poster di ${movie.title}" loading="lazy" />
        <span class="movie-badge">${movie.rating}</span>
      </div>
      <div class="movie-info">
        <div class="movie-text">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-meta">${movie.genre} • ${movie.duration} min • ${movie.year}</p>
        </div>
        <button class="movie-cta" data-movie-id="${movie.id}">Scopri di più</button>
      </div>
    </article>
  `;
}