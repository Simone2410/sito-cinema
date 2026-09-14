import './style.css';
import { getMoviesInProgrammazione } from './services/movies.service';
import { renderMovieCard } from './components/movieCard';

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
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p>⚠️ Errore nel caricamento dei film. Riprova più tardi.</p>';
  }
}

renderHome();