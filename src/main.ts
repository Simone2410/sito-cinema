import './style.css';
import { getMoviesInProgrammazione, getMovieById, getMovieShowtimes } from './services/movies.service';
import { renderMovieCard } from './components/movieCard';
import { renderMovieDetail } from './components/movieDetail';

const app = document.querySelector<HTMLDivElement>('#app')!;

async function renderHome() {
  app.innerHTML = `
    <section class="movies-section">
      <h2 class="section-title">Film in programmazione</h2>
      <div class="movies-grid" id="movies-grid">
        <p>Caricamento film...</p>
      </div>
    </section>
  `;

  const grid = document.querySelector<HTMLDivElement>('#movies-grid')!;

  try {
    const movies = await getMoviesInProgrammazione();
    grid.innerHTML = movies.length
      ? movies.map(renderMovieCard).join('')
      : '<p>Nessun film in programmazione al momento.</p>';

    // Gestione click sul pulsante "Scopri di più"
    grid.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLButtonElement>('.movie-cta');
      
      if (button && button.dataset.movieId) {
        const movieId = Number(button.dataset.movieId);
        renderDetailPage(movieId);
      }
    });

  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p>⚠️ Errore nel caricamento dei film. Riprova più tardi.</p>';
  }
}

async function renderDetailPage(movieId: number) {
  app.innerHTML = '<p class="loading">Caricamento scheda film...</p>';

  try {
    // Recuperiamo prima il film
    const movie = await getMovieById(movieId);

    // Recuperiamo gli spettacoli (gestito per non bloccare la pagina se vuoto/404)
    const showtimes = await getMovieShowtimes(movieId);

    app.innerHTML = renderMovieDetail(movie, showtimes);

    // Gestione click sul pulsante "Torna ai film"
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn');
    backBtn?.addEventListener('click', () => {
      renderHome();
    });

  } catch (error) {
    console.error('Errore nel dettaglio film:', error);
    app.innerHTML = `
      <p style="color: #ff4d4d; margin-bottom: 1rem;">⚠️ Errore nel caricamento del film.</p>
      <button id="back-btn" class="back-button">&larr; Torna alla Home</button>
    `;
    document.querySelector('#back-btn')?.addEventListener('click', () => renderHome());
  }
}

// Avvio iniziale
renderHome();