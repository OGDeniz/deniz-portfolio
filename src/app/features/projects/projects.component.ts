import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TechSphereComponent } from './tech-sphere.component';

type ProjectCategory = 'Web' | 'App' | 'Game' | 'Portfolio';

interface Project {
  title: string;
  category: ProjectCategory;
  featured: boolean;
  summary: string;
  description: string;
  technicalDescription?: string;
  impact?: string;
  role?: string;
  focus?: string;
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
  imports: [CommonModule, ScrollAnimateDirective, TechSphereComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  private sanitizer = inject(DomSanitizer);

  readonly introTags = [
    'Frontend',
    'Fullstack',
    'Angular',
    'React',
    'Next.js',
    'TypeScript',
    'C# / .NET',
    'UX',
  ];

  projects: Project[] = [
      {
    title: 'KAOS Media',
    category: 'Web',
    featured: true,
    summary:
      'Co-Founder einer Kreativagentur für digitales Marketing mit Fokus auf Branding, Webentwicklung und Performance.',
    description:
      'Als Co-Founder von KAOS Media verantworte ich die Konzeption, Entwicklung und technische Umsetzung digitaler Lösungen mit Fokus auf conversion-orientierte Websites und skalierbare Frontend-Architektur.',
    technicalDescription:
      'Aufbau einer modularen, performanten Website mit Fokus auf UX, klare Informationsarchitektur und SEO-nahe Struktur. Einsatz moderner Frontend-Technologien sowie Motion-Design zur Verbesserung der Nutzerführung und Conversion.',
    impact: 'Agenturaufbau · Branding · UX · Conversion',
    role: 'Co-Founder · Frontend Architect · UX/UI Engineer',
    focus:
      'Frontend-Architektur, UX-Struktur, Performance, SEO und technische Umsetzung von Marketing-Systemen',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'SEO',
      'UX/UI Design',
      'Performance Optimization'
    ],
    image: '/projects/kaos.png',
    link: 'https://kaosmedia.de/',
    linkLabel: 'Zur Website'
  },
    {
      title: 'RP Schließtechnik',
      category: 'Web',
      featured: true,
      summary:
        'Conversion-orientierte Business-Website für einen Schlüsseldienst mit lokalem SEO-Fokus und klarer Nutzerführung.',
      description:
        'Moderne Business-Website für einen Schlüsseldienst mit Fokus auf Vertrauen, schnelle Kontaktaufnahme und lokale Auffindbarkeit.',
      technicalDescription:
        'Umgesetzt als performante Next.js-Anwendung mit React und TypeScript. Der Fokus lag auf sauberer Informationsarchitektur, Mobile-First-Umsetzung, Local SEO und technischen Grundlagen für gute Sichtbarkeit. JSON-LD wurde für strukturierte Daten eingebunden, Bilder und Inhalte wurden für schnelle Ladezeiten optimiert. Zusätzlich wurde auf Conversion-nahe Kontaktpunkte wie Hotline, Call-to-Actions und vertrauensbildende Inhalte geachtet.',
      impact: 'Local SEO, Performance, Conversion',
      role: 'Konzeption, Frontend-Umsetzung, Struktur, UX und technische Optimierung',
      focus: 'Next.js, SEO, responsive Design, Conversion-orientierte Inhalte',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JSON-LD'],
      image: '/projects/schluessel.png',
      link: 'https://www.schluesselrp.de/',
      linkLabel: 'Zur Website',
    },
    {
      title: 'BürokratieKompass',
      category: 'Web',
      featured: true,
      summary:
        'Angular-SSR-Plattform mit modularer Struktur, serviceorientierter UX und klarer Inhaltsarchitektur.',
      description:
        'Service-Website für Bürokratie-Dienstleistungen mit Fokus auf Struktur, Vertrauen, schnelle Orientierung und moderne technische Basis.',
      technicalDescription:
        'Die Anwendung wurde mit Angular 20, TypeScript und SSR aufgebaut. Ziel war eine saubere, modulare Architektur mit eigenständigen Bereichen für verschiedene Leistungen. Durch serverseitiges Rendering wurde die technische Basis für bessere Ladezeiten und SEO geschaffen. Zusätzlich lag der Fokus auf klarer Nutzerführung, wiederverwendbaren Komponenten und einer skalierbaren Projektstruktur.',
      impact: 'SSR, modulare Architektur, bessere Struktur für komplexe Inhalte',
      role: 'Frontend-Architektur, Komponentenstruktur, UX-Ausrichtung und technische Umsetzung',
      focus: 'Angular SSR, modulare Seitenstruktur, TailwindCSS, Performance',
      technologies: ['Angular 20', 'TypeScript', 'SSR', 'TailwindCSS'],
      image: '/projects/buero.png',
      link: 'https://buerokratiekompass.de/',
      linkLabel: 'Projekt ansehen',
    },
    {
      title: 'Osteopathie Praxis Website',
      category: 'Web',
      featured: true,
      summary:
        'Moderne Praxis-Website mit React, klarer Informationsstruktur und ruhiger, vertrauenswürdiger UX.',
      description:
        'Responsive Website für eine Osteopathie-Praxis mit Fokus auf Seriosität, Übersichtlichkeit und einfacher Kontaktaufnahme.',
      technicalDescription:
        'Die Website wurde als React-SPA mit TypeScript und Vite umgesetzt. Wichtig waren eine klare Seitenstruktur, ein ruhiges visuelles Erscheinungsbild, responsive Layouts und eine wartbare Komponentenarchitektur. Der Fokus lag auf Performance, sauberem Frontend und einer UX, die Nutzer schnell zu den relevanten Informationen und Kontaktmöglichkeiten führt.',
      impact: 'Responsive UX, klare Nutzerführung, moderne Praxispräsentation',
      role: 'Frontend-Entwicklung, Struktur, responsive Design und technische Umsetzung',
      focus: 'React, TypeScript, Vite, komponentenbasierte Umsetzung',
      technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
      image: '/projects/osteopathie.png',
      link: 'https://osteopathie-weichselfelder.de/',
      linkLabel: 'Zur Website',
    },
    {
      title: 'Portfolio Website',
      category: 'Portfolio',
      featured: true,
      summary:
        'Mein eigenes Developer-Portfolio mit Fokus auf modernes UI, klare Positionierung und performante Angular-Struktur.',
      description:
        'Persönliche Portfolio-Website zur Präsentation meiner Projekte, Skills und Arbeitsweise mit klarem Fokus auf Arbeitgeber-Relevanz.',
      technicalDescription:
        'Das Portfolio wurde als moderne Angular-Anwendung aufgebaut und in den letzten Iterationen gezielt auf stärkere Positionierung, bessere UI/UX und saubere Komponentenstruktur optimiert. Dazu gehören modulare Seiten, Performance-orientierte Rendering-Strategien, klare Projektpräsentation per Modal und eine visuelle Sprache, die mehr in Richtung hochwertiges Produktportfolio statt klassischer Bewerbungsseite geht.',
      impact: 'Stärkere Positionierung, bessere Arbeitgeber-Kommunikation, moderne UX',
      role: 'Konzept, UI/UX, Frontend-Entwicklung und inhaltliche Ausrichtung',
      focus: 'Angular, TypeScript, SCSS, Component Architecture',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: '/projects/portfolio.png',
      github: 'https://github.com/OGDeniz/deniz-portfolio',
    },
    {
      title: 'Urlaubsapp',
      category: 'App',
      featured: false,
      summary:
        'Native Android-App zur Reiseplanung mit Countdown, Packliste und lokaler Datenspeicherung.',
      description:
        'Mobile App zur Urlaubsplanung mit Fokus auf praktischer Nutzung, strukturierter Datenhaltung und mobilem UI.',
      technicalDescription:
        'Die App wurde nativ für Android mit Kotlin und Java entwickelt. Sie nutzt Android Architecture Components, lokale Datenspeicherung und eine klare Trennung der Zuständigkeiten. Im Fokus standen eine nutzerfreundliche Oberfläche, Offline-Fähigkeit, Countdown-Logik und die Verwaltung von Packlisten. Die technische Umsetzung orientierte sich an sauberer Architektur und alltagstauglicher Funktionalität.',
      impact: 'Mobile UX, lokale Persistenz, saubere App-Struktur',
      role: 'Konzeption, Entwicklung und technische Struktur der App',
      focus: 'Android, lokale Daten, mobile Interaktionen',
      technologies: ['Kotlin', 'Android', 'Java'],
      image: '/projects/UrlaubsApp1.jpg',
      images: ['/projects/UrlaubsApp1.jpg', '/projects/UrlaubsApp2.jpg'],
      github: 'https://github.com/OGDeniz/Urlaubsapp/tree/main',
    },
    {
      title: 'Lost Files',
      category: 'Game',
      featured: false,
      summary:
        'Browserbasiertes 2D-Game mit Canvas, Genre-Wechseln und klassischer Game-Loop-Logik.',
      description:
        '2D-Adventure mit spielerischem Fokus auf Mechaniken, Genre-Vielfalt und technischer Umsetzung im Browser.',
      technicalDescription:
        'Das Spiel wurde mit HTML5 Canvas und JavaScript entwickelt. Zentrale Themen waren Game Loop, Kollisionserkennung, Bewegungslogik, Rendering und unterschiedliche Gameplay-Elemente. Das Projekt zeigt meine Fähigkeit, auch interaktive Systeme jenseits klassischer Webseiten zu denken und umzusetzen.',
      impact: 'Interaktive Logik, Canvas-Rendering, spielerische Systementwicklung',
      role: 'Game-Konzept, Programmierung und technische Umsetzung',
      focus: 'HTML5 Canvas, JavaScript, Gameplay-Mechaniken',
      technologies: ['HTML5', 'JavaScript', 'Canvas'],
      image: '/projects/lostFiles.png',
      play: true,
    },
    {
      title: 'Spectral Lounge Chaos',
      category: 'Game',
      featured: false,
      summary:
        'VR-Spielkonzept für Meta Quest mit Unity, Blender-Assets und immersivem Gameplay-Fokus.',
      description:
        'Grobkonzept für ein VR-Laser-Tag-Spiel im virtuellen Zirkus als Abschlussarbeitsprojekt.',
      technicalDescription:
        'Das Projekt wurde als VR-Konzept mit Unity und C# geplant. Im Fokus standen Interaktion, Immersion, Hand-Tracking, räumliches Audio und Performance-Anforderungen für Mobile VR. Assets wurden in Blender vorbereitet. Auch wenn der Schwerpunkt konzeptionell war, zeigt das Projekt meine Fähigkeit, komplexe technische Systeme zu strukturieren und spielerisch zu denken.',
      impact: 'VR-Konzeption, technische Planung, 3D- und Gameplay-Denken',
      role: 'Konzept, technische Planung, 3D- und Gameplay-Ausarbeitung',
      focus: 'Unity, C#, VR, Blender',
      technologies: ['Unity', 'C#', 'Meta Quest', 'Blender 3D'],
      image: '/projects/GameCover02.png',
      link: '/projects/GrobKonzept_Abschlussarbeit.pdf',
      linkLabel: 'Konzept ansehen',
    },
  ];

  readonly techIconMap: Record<string, string> = {
    'React': 'devicon-react-original colored',
    'Next.js': 'devicon-nextjs-plain',
    'TypeScript': 'devicon-typescript-plain colored',
    'JavaScript': 'devicon-javascript-plain colored',
    'Tailwind CSS': 'devicon-tailwindcss-plain colored',
    'TailwindCSS': 'devicon-tailwindcss-plain colored',
    'Angular': 'devicon-angular-plain colored',
    'Angular 20': 'devicon-angular-plain colored',
    'Vite': 'devicon-vitejs-plain colored',
    'CSS': 'devicon-css3-plain colored',
    'SCSS': 'devicon-sass-plain colored',
    'HTML5': 'devicon-html5-plain colored',
    'Kotlin': 'devicon-kotlin-plain colored',
    'Android': 'devicon-android-plain colored',
    'Java': 'devicon-java-plain colored',
    'Unity': 'devicon-unity-plain',
    'C#': 'devicon-csharp-plain colored',
    'Blender 3D': 'devicon-blender-original colored',
    'Docker': 'devicon-docker-plain colored',
    'Git': 'devicon-git-plain colored',
  };

  playingProject: Project | null = null;
  trustedGameUrl: SafeResourceUrl | null = null;
  loading = false;
  loadError = false;

  selectedProject = signal<Project | null>(null);
  expandedTechnical = signal<boolean>(false);

  featuredProjects(): Project[] {
    return this.projects.filter((project) => project.featured);
  }

  archiveProjects(): Project[] {
    return this.projects.filter((project) => !project.featured);
  }

  openGame(project: Project) {
    this.playingProject = project;
    const gamePath = '/assets/games/lostFiles/index.html';
    this.trustedGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(gamePath);
    this.loading = true;
    this.loadError = false;

    setTimeout(() => {
      if (this.loading) {
        this.loadError = true;
      }
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
    if (event) {
      event.preventDefault();
    }

    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const normalizedBase = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
    const path = `${normalizedBase}assets/games/lostFiles/index.html`.replace('//assets', '/assets');
    const url = new URL(path, window.location.origin).href;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

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

  trackByTitle(index: number, item: Project): string | number {
    return item.title ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (typeof item === 'string' || typeof item === 'number') {
      return item;
    }

    return index;
  }
}
