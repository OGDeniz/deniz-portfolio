// src/app/projects/projects.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  title: string;
  description: string;
  technologies?: string[];
  image: string;
  link?: string;
  play?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Ihre eigene Website mit Angular, die Sie gerade aufbauen.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: '/projects/portfolio.png',
      link: 'http://localhost:4200/'
    },
    {
      title: '2D Game: Lost Files',
      description: 'Programmierer reist durchs All, meistert Genres, rettet legendäres, geheimnisvolles Spiel.',
      technologies: ['HTML5', 'JavaScript'],
      image: '/projects/lostFiles.png',
      play: true
    },
    {
      title: 'Web‑API Service',
      description: 'Backend‑Service mit Node.js für Datenverarbeitung.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      image: '/projects/api-service.png'
      // optional kein Link
    }
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
    const path = `${normalizedBase}assets/games/lostFiles/index.html`.replace('//assets', '/assets');
    const url = new URL(path, window.location.origin).href;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // trackBy helpers for ngFor
  trackByTitle(index: number, item: Project): string | number {
    return item.title ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (item === null || item === undefined) return index;
    if (typeof item === 'string' || typeof item === 'number') return item as unknown as string | number;
    return index;
  }
}
