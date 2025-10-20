// src/app/projects/projects.component.ts
import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Ihre eigene Website mit Angular, die Sie gerade aufbauen.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: '/public/projects/portfolio.png', // Pfad im public-Verzeichnis
      link: 'https://example.com'
    },
    {
      title: 'Game Demo',
      description: 'Kleines 2D‑Spiel als Lernprojekt.',
      technologies: ['Unity', 'C#'],
      image: '/public/projects/game-demo.jpg',
      link: 'https://example.com'
    },
    {
      title: 'Web‑API Service',
      description: 'Backend‑Service mit Node.js für Datenverarbeitung.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      image: '/public/projects/api-service.png'
      // optional kein Link
    }
  ];
}
