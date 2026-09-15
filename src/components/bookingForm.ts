export function renderBookingForm(): string {
  return `
    <div class="booking-page">
      <button id="back-to-film-btn" class="back-button">&larr; Torna al film</button>

      <div class="booking-card">
        <div class="booking-icon" style="display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 1.2rem;">
          <svg width="52" height="55" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cm-gradient-form" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="65%" stop-color="#4FC3F7" />
                <stop offset="100%" stop-color="#2F8FD1" />
              </linearGradient>
            </defs>

            <!-- Icona Fotogramma + Play (Identica a quella del logo in alto) -->
            <rect x="5" y="6" width="30" height="30" rx="8" stroke="url(#cm-gradient-form)" stroke-width="2.5" fill="rgba(79, 195, 247, 0.05)" />
            <rect x="9" y="9" width="3" height="3" rx="1" fill="url(#cm-gradient-form)" />
            <rect x="28" y="9" width="3" height="3" rx="1" fill="url(#cm-gradient-form)" />
            <rect x="9" y="30" width="3" height="3" rx="1" fill="url(#cm-gradient-form)" />
            <rect x="28" y="30" width="3" height="3" rx="1" fill="url(#cm-gradient-form)" />
            <polygon points="17,15 27,21 17,27" fill="url(#cm-gradient-form)" />
          </svg>
        </div>

        <h2 class="booking-title">Prenota il tuo posto</h2>
        <p class="booking-subtitle">Compila il modulo per completare la prenotazione</p>

        <form id="booking-form" class="booking-form">
          <div class="form-group">
            <label for="first-name">NOME</label>
            <input type="text" id="first-name" name="first_name" placeholder="es. Mario" required />
          </div>
          <div class="form-group">
            <label for="last-name">COGNOME</label>
            <input type="text" id="last-name" name="last_name" placeholder="es. Rossi" required />
          </div>
          <div class="form-group">
            <label for="email">EMAIL</label>
            <input type="email" id="email" name="email" placeholder="es. mario.rossi@email.com" required />
          </div>

          <p id="booking-error" class="booking-error" hidden></p>

          <button type="submit" class="btn-confirm-booking">Conferma prenotazione</button>
        </form>
      </div>
    </div>
  `;
}

export function renderBookingConfirmation(): string {
  return `
    <div class="booking-page">
      <div class="booking-card">
        <div class="booking-icon" style="display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 1.2rem;">
          <svg width="52" height="55" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cm-gradient-confirm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="65%" stop-color="#4FC3F7" />
                <stop offset="100%" stop-color="#2F8FD1" />
              </linearGradient>
            </defs>

            <!-- Icona Fotogramma + Play (Identica a quella del logo in alto) -->
            <rect x="5" y="6" width="30" height="30" rx="8" stroke="url(#cm-gradient-confirm)" stroke-width="2.5" fill="rgba(79, 195, 247, 0.05)" />
            <rect x="9" y="9" width="3" height="3" rx="1" fill="url(#cm-gradient-confirm)" />
            <rect x="28" y="9" width="3" height="3" rx="1" fill="url(#cm-gradient-confirm)" />
            <rect x="9" y="30" width="3" height="3" rx="1" fill="url(#cm-gradient-confirm)" />
            <rect x="28" y="30" width="3" height="3" rx="1" fill="url(#cm-gradient-confirm)" />
            <polygon points="17,15 27,21 17,27" fill="url(#cm-gradient-confirm)" />
          </svg>
        </div>

        <h2 class="booking-title">Prenotazione confermata!</h2>
        <p class="booking-subtitle">Riceverai una email di riepilogo. Ti aspettiamo al cinema!</p>
        <button id="back-home-btn" class="back-button">&larr; Torna alla home</button>
      </div>
    </div>
  `;
}