import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

export type ScrollAnimateVariant = 'up' | 'left' | 'right' | 'scale' | 'blur';

const HIDDEN_TRANSFORM: Record<ScrollAnimateVariant, string> = {
  up: 'translateY(20px)',
  left: 'translateX(-30px)',
  right: 'translateX(30px)',
  scale: 'scale(0.95)',
  blur: 'translateY(12px)'
};

/**
 * Directive für Scroll-basierte Animationen
 *
 * Verwendung:
 * <div appScrollAnimate="section-id" variant="left" [scrollDelay]="i * 60">Content</div>
 *
 * Die Animation wird durch CSS gesteuert (siehe styles.scss .scroll-animate-in / [data-scroll-variant]).
 */
@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input('appScrollAnimate') sectionId: string = '';
  @Input() variant: ScrollAnimateVariant = 'up';
  /** Stagger delay in ms, applied via CSS custom property (e.g. index * 60). */
  @Input() scrollDelay = 0;

  constructor(
    private el: ElementRef<HTMLElement>,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit(): void {
    if (this.sectionId) {
      const nativeEl = this.el.nativeElement;

      // Setze die ID als HTML-Attribut für IntersectionObserver
      nativeEl.setAttribute('data-scroll-id', this.sectionId);
      nativeEl.setAttribute('data-scroll-variant', this.variant);

      if (this.scrollDelay > 0) {
        nativeEl.style.setProperty('--scroll-delay', `${this.scrollDelay}ms`);
      }

      // Registriere die Section beim Service
      this.scrollAnimationService.registerSection(this.sectionId, nativeEl);

      // Delay das Verstecken, damit Home-Seite sofort sichtbar ist
      setTimeout(() => {
        // Wenn Element bereits sichtbar, direkt Animation anwenden
        if (this.isElementInViewport()) {
          nativeEl.classList.add('scroll-animate-in');
        } else {
          // Ansonsten: versteckt bis Animation
          nativeEl.style.opacity = '0';
          nativeEl.style.transform = HIDDEN_TRANSFORM[this.variant];
          if (this.variant === 'blur') {
            nativeEl.style.filter = 'blur(12px)';
          }
        }
      }, 50);
    }
  }

  private isElementInViewport(): boolean {
    if (typeof window === 'undefined') return false;
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  ngOnDestroy(): void {
    if (this.sectionId) {
      this.scrollAnimationService.unregisterSection(this.sectionId);
    }
  }
}
