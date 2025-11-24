import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  title: string;
  description: string;
  technicalDescription?: string;
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
      description: 'Meine eigene Portfolio-Website mit Angular, die Sie gerade aufbauen.',
      technicalDescription:
        'Entwickelt als moderne Single-Page-Application (SPA) mit Angular 19 und TypeScript. Features umfassen responsive Design mit SCSS, dynamische Projektgalerie mit Modal-Dialoge, Kontaktformular mit Validierung, und Spielintegration über iFrame-Sandboxing. Implementiert Signal-basiertes State-Management für optimale Change Detection, TrackBy-Funktionen für Performance bei großen Listen, und Angular Standalone Components für modulare Architektur.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: '/projects/portfolio.png',
      link: 'http://localhost:4200/',
      github: 'https://github.com/OGDeniz/deniz-portfolio',
    },
    {
      title: '2D Game: Lost Files',
      description:
        'Programmierer reist durchs All, meistert Genres, rettet legendäres, geheimnisvolles Spiel.',
      technicalDescription:
        'Browserbasierten 2D-Adventure entwickelt mit reinem HTML5 Canvas und JavaScript. Game-Mechaniken umfassen Platformer-Physik mit Schwerkraft, Sprung-Mechaniken und Kollisionserkennung. Verschiedene Spielmodi demonstrieren Genre-Vielfalt (Action, Puzzle, Adventure). Implementiert Game Loop mit RequestAnimationFrame für 60 FPS, Entity-Component-Systeme für Verwaltung von Game Objects, und Canvas-2D Context für Rendering und Animationen.',
      technologies: ['HTML5', 'JavaScript'],
      image: '/projects/lostFiles.png',
      play: true,
    },
    {
      title: 'Spectral Lounge Chaos - VR Game',
      description:
        'Immersives VR-Laser-Tag-Spiel im virtuellen Zirkus mit Unity. Grobkonzept der Abschlussarbeit 2024.',
      technicalDescription:
        'VR-Spielkonzept für Meta Quest entwickelt mit Unity 3D und C#. Implementiert Hand-Tracking für intuitive Kontrolle von Laser-Pistolen, räumliches Audio für immersives Gameplay, und Multiplayer-Synchronisierung. Assets wurden in Blender 3D modelliert und texturiert. Features umfassen Physics-Engine für realistische Interaktionen, Event-System für Spielmechaniken, und Optimierungen für Mobile VR-Performance. Grobkonzept dokumentiert Gameplay-Loops, technische Architektur und Hardware-Anforderungen.',
      technologies: ['Unity', 'C#', 'Meta Quest', 'Blender 3D'],
      image: '/projects/GameCover02.png',
      link: '/projects/GrobKonzept_Abschlussarbeit.pdf',
      linkLabel: 'Konzept ansehen',
    },
    {
      title: 'RP Schließtechnik - Business Website',
      description:
        '24/7 Schlüsseldienst & Sicherheitslösungen Website. Responsive Design mit Service-Showcase, Kontaktformular und Notfall-Hotline.',
      technicalDescription:
        'Full-Stack Web-Anwendung mit Next.js, React und TypeScript für optimale SEO und Performance. Implementiert App Router für serverseitiges Rendering (SSR) und statische Generierung, wodurch beste Platzierungen bei Google für lokale Suchanfragen erreicht werden. Tailwind CSS für responsive Design und schnelle Entwicklung. JSON-LD structured data für bessere Search Engine Integration. Kontaktformular mit Email-Integration, optimierte Bilder mit Next.js Image Component. Mobile-first Ansatz mit 98+ Lighthouse Score.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'JSON-LD'],
      image: '/projects/schluessel.png',
      link: 'https://www.schluesselrp.de/',
      linkLabel: 'Zur Website',
    },
    {
      title: 'BürokratieKompass - Service Website',
      description:
        'Angular 20 SSR-Website für Bürokratie-Dienstleistungen (Pflege, Eltern, PKV). Modern responsive Design mit TailwindCSS und Standalone Components.',
      technicalDescription:
        'Moderne Web-Anwendung mit Angular 20 im Standalone-Komponentenmodell und TypeScript. Implementiert serverseitiges Rendering (SSR) mit Angular Universal für höhere Ladegeschwindigkeit und SEO-Optimierung. TailwindCSS für responsive Grid-Layouts und utility-first Styling. Signal-API für reaktive State-Management, RxJS Observables für asynchrone Datenflüsse. Modular strukturiert mit Feature-Module für verschiedene Dienst-Bereiche (Pflege, Eltern, PKV). Server-Side Validation und sicherer Datenhandling für sensible Informationen.',
      technologies: ['Angular 20', 'TypeScript', 'TailwindCSS', 'SSR'],
      image: '/projects/buero.png',
      link: 'https://buerokratiekompass.de/',
      linkLabel: 'Webseite noch in Arbeit',
    },
    {
      title: 'Ostepathie Praxis Website',
      description:
        'Eine moderne, responsive Website für eine Osteopathie-Praxis, entwickelt mit React, TypeScript und Vite. Die Single-Page-Application bietet Besuchern umfassende Informationen über die Praxis und ermöglicht einfache Kontaktaufnahme.',
      technicalDescription:
        'React-basierte Single-Page-Application mit TypeScript und Vite für blitzschnelle Entwicklung und Build-Zeiten. Moderne Component-Architektur mit Hooks (useState, useEffect, useContext) für State-Management. CSS mit BEM-Methodologie für wartbare und skalierbare Stylesheets. Lazy Loading für Bilder und Code-Splitting für optimierte Performance. Responsive Design mit CSS Media Queries für alle Bildschirmgrößen. Implementiert Contact-Form mit Validierung und Email-Integration. SEO-optimiert mit Meta-Tags und structured data für lokale Suchergebnisse.',
      technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
      image: '/projects/osteopathie.png',
      link: 'https://osteopathie-weichselfelder.de/',
      linkLabel: 'Zur Website',
    },
    {
      title: 'Urlaubsapp - Android App',
      description:
        'Intuitive Android-App zur Urlaubsverwaltung und Reiseplanung. Ermöglicht benutzerfreundliche Verwaltung einer Packliste und einem Countdown. Entwickelt mit modernem Kotlin/Java für nahtloses mobiles Erlebnis mit ansprechendem User Interface.',
      technicalDescription:
        'Native Android-App entwickelt mit Kotlin und Java, implementiert mit Android Architecture Components (ViewModel, LiveData, Room Database). Features umfassen lokale Persistierung von Reisedaten in SQLite, Countdown-Timer mit Notifications, Packlisten mit Checkboxen und Kategorisierung. Nutzt Material Design 3 für modernes UI/UX. Fragment-basierte Navigation mit Navigation Component. Läuft auf Android 8.0+ mit Unterstützung für verschiedene Bildschirmgrößen. Repository-Pattern für saubere Architektur und Dependency Injection mit Hilt. Offline-First Ansatz mit lokaler Datenspeicherung.',
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

  // Modal state for project cards
  selectedProject = signal<Project | null>(null);
  expandedTechnical = signal<boolean>(false);

  openProjectModal(project: Project) {
    this.selectedProject.set(project);
    this.expandedTechnical.set(false);
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    this.selectedProject.set(null);
    this.expandedTechnical.set(false);
    document.body.style.overflow = 'auto';
  }

  toggleTechnicalDescription() {
    this.expandedTechnical.set(!this.expandedTechnical());
  }

  onModalBackdropClick(event: MouseEvent) {
    // Close modal only if clicking on the backdrop itself, not the card
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeProjectModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.selectedProject()) {
      this.closeProjectModal();
    }
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
