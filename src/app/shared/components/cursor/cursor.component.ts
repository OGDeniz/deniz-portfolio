import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .featured-card, .archive-card, .skill-card, [data-cursor-magnetic]';
const RING_LERP_FACTOR = 0.18;

/**
 * Dekorativer Cursor-Layer: Glow-Dot + magnetischer Ring, die über dem echten
 * (sichtbaren) System-Cursor mitlaufen und auf interaktiven Elementen einrasten.
 * Der native Pfeil bleibt für exaktes Klicken/Navigieren erhalten — dieser Layer
 * ersetzt ihn nicht. Nur aktiv bei Fine-Pointer-Geräten (Desktop) ohne
 * prefers-reduced-motion. Farben kommen aus den bestehenden Theme-Variablen
 * (--clr-primary / --clr-secondary), passen sich also automatisch an Light/Dark an.
 * Text-Inputs sind bewusst von der Magnet-Snap-Selektion ausgenommen, damit die
 * Caret-Positionierung nicht durch den Ring gestört wird.
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-active]': 'isActive()',
    '[class.is-magnetic]': 'isMagnetic()'
  }
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('dot', { static: true }) private dotRef!: ElementRef<HTMLElement>;
  @ViewChild('ring', { static: true }) private ringRef!: ElementRef<HTMLElement>;

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly isActive = signal(false);
  protected readonly isMagnetic = signal(false);

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId: number | null = null;
  private hoveredEl: HTMLElement | null = null;
  private listenersAttached = false;

  private readonly handleMouseMove = (event: MouseEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private readonly handleMouseOver = (event: MouseEvent): void => {
    const target = (event.target as HTMLElement)?.closest?.<HTMLElement>(INTERACTIVE_SELECTOR) ?? null;
    if (target === this.hoveredEl) return;

    this.hoveredEl = target;
    this.ngZone.run(() => this.isMagnetic.set(!!target));
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const supportsFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    this.isActive.set(true);

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      document.addEventListener('mouseover', this.handleMouseOver, { passive: true });
      this.listenersAttached = true;
      this.rafId = requestAnimationFrame(this.tick);
    });
  }

  private readonly tick = (): void => {
    this.dotRef.nativeElement.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;

    let targetX = this.mouseX;
    let targetY = this.mouseY;

    if (this.hoveredEl) {
      const rect = this.hoveredEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    this.ringX += (targetX - this.ringX) * RING_LERP_FACTOR;
    this.ringY += (targetY - this.ringY) * RING_LERP_FACTOR;

    this.ringRef.nativeElement.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;

    this.rafId = requestAnimationFrame(this.tick);
  };

  ngOnDestroy(): void {
    if (!this.listenersAttached) return;

    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseover', this.handleMouseOver);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
