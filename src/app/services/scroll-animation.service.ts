import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ScrollSection {
  id: string;
  element: Element;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private sections = new Map<string, ScrollSection>();
  private activeSection = new BehaviorSubject<string | null>(null);
  public activeSection$: Observable<string | null> = this.activeSection.asObservable();

  private observer: IntersectionObserver | null = null;

  constructor(private ngZone: NgZone) {
    this.initializeObserver();
  }

  /**
   * Registriert eine Section für Scroll-Tracking
   */
  registerSection(id: string, element: Element): void {
    this.sections.set(id, {
      id,
      element,
      isVisible: false
    });

    if (this.observer) {
      this.observer.observe(element);
    }
  }

  /**
   * Deregistriert eine Section
   */
  unregisterSection(id: string): void {
    const section = this.sections.get(id);
    if (section && this.observer) {
      this.observer.unobserve(section.element);
    }
    this.sections.delete(id);
  }

  /**
   * Gibt die aktive Section zurück
   */
  getActiveSection(): string | null {
    return this.activeSection.value;
  }

  /**
   * Initialisiert den Intersection Observer
   */
  private initializeObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      const options: IntersectionObserverInit = {
        threshold: 0.3, // Element als sichtbar, wenn 30% sichtbar sind
        rootMargin: '0px 0px -100px 0px' // Ein bisschen vor dem Viewport triggern
      };

      this.observer = new IntersectionObserver((entries) => {
        let newActiveSection: string | null = null;

        entries.forEach(entry => {
          const sectionId = (entry.target as HTMLElement).id;

          if (entry.isIntersecting) {
            const section = this.sections.get(sectionId);
            if (section) {
              section.isVisible = true;

              // Trigger Animation nur wenn Element in Sicht kommt
              this.triggerEnterAnimation(entry.target);

              // Setze als aktive Section wenn oben im Viewport
              if (entry.target.getBoundingClientRect().top < window.innerHeight / 2) {
                newActiveSection = sectionId;
              }
            }
          } else {
            const section = this.sections.get(sectionId);
            if (section) {
              section.isVisible = false;
            }
          }
        });

        // Update aktive Section im Angular Context
        if (newActiveSection) {
          this.ngZone.run(() => {
            this.activeSection.next(newActiveSection);
          });
        }
      });
    });
  }

  /**
   * Triggert Enter-Animation auf Element
   */
  private triggerEnterAnimation(element: Element): void {
    this.ngZone.run(() => {
      element.classList.add('scroll-animate-in');
    });
  }

  /**
   * Cleanup
   */
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
