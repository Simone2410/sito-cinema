import './style.css';
import { getMoviesInProgrammazione, getMovieById, getMovieShowtimes, createBooking } from './services/movies.service';
import { renderBookingForm, renderBookingConfirmation } from './components/bookingForm';
import { renderMovieCard } from './components/movieCard';
import { renderMovieDetail } from './components/movieDetail';

export function setNavTitle(title: string) {
  const titleEl = document.getElementById('nav-page-title');
  if (titleEl) {
    titleEl.textContent = title;
  }
}

const app = document.querySelector<HTMLDivElement>('#app')!;

// Click sul logo in alto per tornare in Home in qualsiasi momento
document.querySelector('.logo-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  renderHome();
});

async function renderHome() {
  setNavTitle('HOME'); // <--- Imposta il titolo nell'header

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
  setNavTitle('SCHEDA FILM'); // <--- Imposta il titolo nell'header

  app.innerHTML = '<p class="loading">Caricamento scheda film...</p>';

  try {
    const movie = await getMovieById(movieId);
    const showtimes = await getMovieShowtimes(movieId);

    app.innerHTML = renderMovieDetail(movie, showtimes);

    // Gestione click sul pulsante "Torna ai film"
    const backBtn = document.querySelector<HTMLButtonElement>('#back-btn');
    backBtn?.addEventListener('click', () => {
      renderHome();
    });

    // Gestione click sul pulsante "Prenota" di ogni spettacolo
    const showtimesList = document.querySelector<HTMLDivElement>('.showtimes-list');
    showtimesList?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest<HTMLButtonElement>('.btn-prenota');

      if (button && button.dataset.screeningId) {
        const screeningId = Number(button.dataset.screeningId);
        renderBookingPage(movieId, screeningId);
      }
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

function renderBookingPage(movieId: number, screeningId: number) {
  setNavTitle('PRENOTAZIONE'); // <--- Imposta il titolo nell'header

  app.innerHTML = renderBookingForm();

  document.querySelector('#back-to-film-btn')?.addEventListener('click', () => {
    renderDetailPage(movieId);
  });

  const form = document.querySelector<HTMLFormElement>('#booking-form')!;
  const errorEl = document.querySelector<HTMLParagraphElement>('#booking-error')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('.btn-confirm-booking')!;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const formData = new FormData(form);
    const payload = {
      first_name: String(formData.get('first_name') ?? '').trim(),
      last_name: String(formData.get('last_name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';

    try {
      await createBooking(screeningId, payload);
      renderBookingSuccess();
    } catch (error) {
      errorEl.textContent = error instanceof Error ? error.message : 'Errore nella prenotazione.';
      errorEl.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Conferma prenotazione';
    }
  });
}

function renderBookingSuccess() {
  setNavTitle('PRENOTAZIONE'); // <--- Mantiene il titolo aggiornato anche alla schermata finale

  app.innerHTML = renderBookingConfirmation();

  document.querySelector('#back-home-btn')?.addEventListener('click', () => {
    renderHome();
  });
}

// Avvio iniziale
renderHome();