import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme-preference';
  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());

  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
    this.watchSystemPreference();
  }

  /**
   * Setzt das Theme und speichert die Preference
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    this.applyTheme(theme);
  }

  /**
   * Gibt das aktuelle Theme zurück
   */
  getTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Schaltet zwischen Light und Dark Mode
   */
  toggleTheme(): void {
    const current = this.getTheme();
    const next: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  /**
   * Beobachtet System-Farbschema-Änderungen
   */
  private watchSystemPreference(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listener für Systemeinstellung-Änderungen
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', () => {
        if (this.getTheme() === 'system') {
          this.applyTheme('system');
        }
      });
    }
  }

  /**
   * Wendet das Theme auf das Dokument an
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;
    const isDark = this.shouldUseDarkMode(theme);

    if (isDark) {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.style.colorScheme = 'light';
    }
  }

  /**
   * Bestimmt, ob Dark Mode verwendet werden soll
   */
  private shouldUseDarkMode(theme: Theme): boolean {
    if (theme === 'system') {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  }

  /**
   * Bestimmt das initiale Theme
   */
  private getInitialTheme(): Theme {
    // 1. Versuche gespeicherte Preference zu laden
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored;
      }
    }

    // 2. Nutze System-Preference als Fallback
    return 'system';
  }
}
