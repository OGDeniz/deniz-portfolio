import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

/**
 * Directive für Scroll-basierte Animationen
 *
 * Verwendung:
 * <div appScrollAnimate="section-id">Content</div>
 *
 * Die Animation wird durch CSS gesteuert:
 * .scroll-animate-in { animation: fadeInUp 0.6s ease-out; }
 */
@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input('appScrollAnimate') sectionId: string = '';

  constructor(
    private el: ElementRef<HTMLElement>,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit(): void {
    if (this.sectionId) {
      // Registriere die Section beim Service
      this.scrollAnimationService.registerSection(this.sectionId, this.el.nativeElement);

      // Delay das Verstecken, damit Home-Seite sofort sichtbar ist
      setTimeout(() => {
        // Wenn Element bereits sichtbar, direkt Animation anwenden
        if (this.isElementInViewport()) {
          this.el.nativeElement.classList.add('scroll-animate-in');
        } else {
          // Ansonsten: versteckt bis Animation
          this.el.nativeElement.style.opacity = '0';
          this.el.nativeElement.style.transform = 'translateY(20px)';
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
