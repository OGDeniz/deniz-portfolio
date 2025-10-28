import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  selector: 'app-play-lost-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-lost-files.component.html',
  styleUrls: ['./play-lost-files.component.scss']
})
export class PlayLostFilesComponent {
  // Simple wrapper for the embedded game
  private readonly gameUrl = '/assets/games/lostFiles/index.html';
  trustedGameUrl: SafeResourceUrl;

  loading = true;
  loadError = false;

  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.trustedGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gameUrl);
    // After a reasonable timeout, mark as error if still loading
    setTimeout(() => {
      if (this.loading) this.loadError = true;
    }, 7000);
  }

  onIframeLoad() {
    this.loading = false;
    this.loadError = false;
  }

  onIframeError() {
    this.loading = false;
    this.loadError = true;
  }

  /**
   * Öffnet das Spiel in einem neuen Tab mit einer absoluten URL, die das <base href>
   * der App berücksichtigt. So wird verhindert, dass der SPA-Router die Navigation abfängt
   * und die Startseite ausgeliefert wird.
   */
  openDirect(event?: MouseEvent) {
    if (event) event.preventDefault();
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    // Ensure baseHref ends with a slash
    const normalizedBase = baseHref.endsWith('/') ? baseHref : baseHref + '/';
    const path = `${normalizedBase}assets/games/lostFiles/index.html`.replace('//assets', '/assets');
    const url = new URL(path, window.location.origin).href;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
