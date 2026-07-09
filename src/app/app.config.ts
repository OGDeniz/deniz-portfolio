import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

/// App Konfiguration mit verschiedenen Providern für die Angular-Anwendung
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Globale Fehlerbehandlung aktivieren, um Fehler im Browser zu erfassen und zu melden
    provideZoneChangeDetection({ eventCoalescing: true }), // Änderungserkennung mit Ereigniszusammenfassung bereitstellen, um die Leistung zu verbessern
    // withViewTransitions: nutzt die native View Transitions API für den Slide-Effekt beim Seitenwechsel (siehe styles.scss)
    provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
    provideClientHydration(withEventReplay()), // Router und Client-Hydration mit Ereigniswiedergabe bereitstellen
    provideHttpClient() // HTTP-Client bereitstellen, um HTTP-Anfragen zu ermöglichen und zu verwalten
  ]
};
