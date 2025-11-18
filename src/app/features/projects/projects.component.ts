import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  title: string;
  description: string;
  technologies?: string[];
  image: string;
  images?: string[];
  link?: string;
  linkLabel?: string;
  play?: boolean;
  github?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Ihre eigene Website mit Angular, die Sie gerade aufbauen.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: '/projects/portfolio.png',
      link: 'http://localhost:4200/',
      github: 'https://github.com/OGDeniz/deniz-portfolio',
    },
    {
      title: '2D Game: Lost Files',
      description:
        'Programmierer reist durchs All, meistert Genres, rettet legendäres, geheimnisvolles Spiel.',
      technologies: ['HTML5', 'JavaScript'],
      image: '/projects/lostFiles.png',
      play: true,
    },
    {
      title: 'Spectral Lounge Chaos - VR Game',
      description:
        'Immersives VR-Laser-Tag-Spiel im virtuellen Zirkus mit Unity. Grobkonzept der Abschlussarbeit 2024.',
      technologies: ['Unity', 'C#', 'Meta Quest', 'Blender 3D'],
      image: '/projects/GameCover02.png',
      link: '/projects/GrobKonzept_Abschlussarbeit.pdf',
      linkLabel: 'Konzept ansehen',
    },
    {
      title: 'RP Schließtechnik - Business Website',
      description:
        '24/7 Schlüsseldienst & Sicherheitslösungen Website. Responsive Design mit Service-Showcase, Kontaktformular und Notfall-Hotline.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'JSON-LD'],
      image: '/projects/schluessel.png',
      link: 'https://www.schluesselrp.de/',
    },
    {
      title: 'BürokratieKompass - Service Website',
      description:
        'Angular 20 SSR-Website für Bürokratie-Dienstleistungen (Pflege, Eltern, PKV). Modern responsive Design mit TailwindCSS und Standalone Components.',
      technologies: ['Angular 20', 'TypeScript', 'TailwindCSS', 'SSR'],
      image: '/projects/buero.png',
      link: 'https://buerokratiekompass.de/',
      linkLabel: 'Webseite noch in Arbeit',
    },
    {
      title: 'Urlaubsapp - Android App',
      description:
        'Intuitive Android-App zur Urlaubsverwaltung und Reiseplanung. Ermöglicht benutzerfreundliche Verwaltung einer Packliste und einem Countdown. Entwickelt mit modernem Kotlin/Java für nahtloses mobiles Erlebnis mit ansprechendem User Interface.',
      technologies: ['Kotlin', 'Android', 'Java'],
      image: '/projects/UrlaubsApp1.jpg',
      images: ['/projects/UrlaubsApp1.jpg', '/projects/UrlaubsApp2.jpg'],
      github: 'https://github.com/OGDeniz/Urlaubsapp/tree/main',
    },

  ];

  // Play state
  private sanitizer = inject(DomSanitizer);
  playingProject: Project | null = null;
  trustedGameUrl: SafeResourceUrl | null = null;
  loading = false;
  loadError = false;

  openGame(project: Project) {
    this.playingProject = project;
    // For now use a known game path; you can expand project objects to include gamePath
    const gamePath = '/assets/games/lostFiles/index.html';
    this.trustedGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(gamePath);
    this.loading = true;
    this.loadError = false;
    setTimeout(() => {
      if (this.loading) this.loadError = true;
    }, 7000);
  }

  closeGame() {
    this.playingProject = null;
    this.trustedGameUrl = null;
    this.loading = false;
    this.loadError = false;
  }

  onIframeLoad() {
    this.loading = false;
    this.loadError = false;
  }

  openDirect(event?: MouseEvent) {
    if (event) event.preventDefault();
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const normalizedBase = baseHref.endsWith('/') ? baseHref : baseHref + '/';
    const path = `${normalizedBase}assets/games/lostFiles/index.html`.replace(
      '//assets',
      '/assets',
    );
    const url = new URL(path, window.location.origin).href;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // trackBy helpers for ngFor
  trackByTitle(index: number, item: Project): string | number {
    return item.title ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (item === null || item === undefined) return index;
    if (typeof item === 'string' || typeof item === 'number')
      return item as unknown as string | number;
    return index;
  }
}
