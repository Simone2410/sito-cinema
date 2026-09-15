import type { MovieDetail, Showtime } from '../types/movie';

const FALLBACK_POSTER = 'https://placehold.co/300x445?text=No+Poster';


export function renderShowtimeCard(screening: any): string {
  // Formattiamo la data a partire da screening.starts_at
  const dateObj = new Date(screening.starts_at);
  
  const dateStr = dateObj.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const timeStr = dateObj.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const roomName = screening.hall?.name || 'Sala Standard';
  const totalCapacity = screening.hall?.capacity || 150;
  const availableSeats = screening.available_seats ?? 0;
  const isAvailable = availableSeats > 0;

    return `
    <div class="showtime-card">
      <div class="showtime-info">
        <div class="showtime-time-box">
          <span class="showtime-date">${dateStr}</span>
          <span class="showtime-time">${timeStr}</span>
        </div>
        <div class="showtime-details">
          <h4 class="room-title">${roomName}</h4>
          <p class="seats-count">${availableSeats} / ${totalCapacity} posti disponibili</p>
        </div>
      </div>
      <div class="showtime-action">
        <span class="status-badge ${isAvailable ? 'available' : 'sold-out'}">
          ${isAvailable ? 'DISPONIBILE' : 'ESAURITO'}
        </span>
        ${
          isAvailable
            ? `<button class="btn-prenota" data-screening-id="${screening.id}">Prenota</button>`
            : ''
        }
      </div>
    </div>
  `;
}

export function renderMovieDetail(movie: MovieDetail, showtimes: Showtime[]): string {
  const poster = movie.poster_url ?? FALLBACK_POSTER;

  return `
    <div class="movie-detail-container">
      <button id="back-btn" class="back-button">&larr; Torna ai film</button>
      
      <div class="movie-hero">
        <div class="movie-detail-poster">
          <img src="${poster}" alt="Poster di ${movie.title}" />
        </div>
        <div class="movie-detail-info">
          <h1 class="detail-title">${movie.title}</h1>
          
          <div class="detail-tags">
            <span class="tag">${movie.genre}</span>
            <span class="tag">${movie.year}</span>
            <span class="tag rating">${movie.rating}</span>
            <span class="tag">${movie.duration} MIN</span>
          </div>

          <div class="info-block">
            <span class="info-label">REGISTA</span>
            <p class="info-value">${movie.director}</p>
          </div>

          <div class="info-block">
            <span class="info-label">TRAMA</span>
            <p class="info-value description">${movie.description}</p>
          </div>
        </div>
      </div>

      <div class="detail-divider"></div>

      <section class="showtimes-section">
        <h2 class="section-title">PROSSIMI SPETTACOLI</h2>
        <div class="showtimes-list">
          ${
            showtimes.length
              ? showtimes.map(renderShowtimeCard).join('')
              : '<p class="no-showtimes">Nessun spettacolo in programma per questo film.</p>'
          }
        </div>
      </section>
    </div>
  `;
}