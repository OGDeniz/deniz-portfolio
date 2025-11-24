import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private activeLink = new BehaviorSubject<string>('home');
  public activeLink$: Observable<string> = this.activeLink.asObservable();

  private navLinks: NavLink[] = [];
  private scrollListener: (() => void) | null = null;

  constructor(private ngZone: NgZone) {
    this.initScrollListener();
  }

  /**
   * Registriert Navigation Links
   */
  registerLinks(links: NavLink[]): void {
    this.navLinks = links;
    this.updateActiveLink();
  }

  /**
   * Gibt aktiven Link zurück
   */
  getActiveLink(): string {
    return this.activeLink.value;
  }

  /**
   * Setzt aktiven Link
   */
  setActiveLink(linkId: string): void {
    this.activeLink.next(linkId);
  }

  /**
   * Scrollt zu einer Section (smooth scrolling)
   */
  scrollToSection(sectionId: string): void {
    if (typeof document === 'undefined') return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.setActiveLink(sectionId);
    }
  }

  /**
   * Initialisiert Scroll-Listener
   */
  private initScrollListener(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        this.updateActiveLink();
      };

      // Debounce scroll events für bessere Performance
      let scrollTimeout: any;
      const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.updateActiveLink();
        }, 50);
      };

      window.addEventListener('scroll', debouncedScroll, { passive: true });
    });
  }

  /**
   * Aktualisiert aktiven Link basierend auf Scroll-Position
   */
  private updateActiveLink(): void {
    if (!this.navLinks.length || typeof document === 'undefined' || typeof window === 'undefined') return;

    let activeId = this.navLinks[0].id;
    let closestDistance = Infinity;

    // Finde die Section, die am nächsten zur viewport-Mitte ist
    this.navLinks.forEach(link => {
      const element = document.getElementById(link.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);

        if (distance < closestDistance) {
          closestDistance = distance;
          activeId = link.id;
        }
      }
    });

    // Nur update wenn sich active link geändert hat
    if (activeId !== this.activeLink.value) {
      this.ngZone.run(() => {
        this.activeLink.next(activeId);
      });
    }
  }

  /**
   * Cleanup
   */
  ngOnDestroy(): void {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
