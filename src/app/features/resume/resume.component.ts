import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

interface ResumeEntry {
  period: string;
  title: string;
  subtitle?: string;
  details?: string[];
  highlight?: string;
}

interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  hero = {
    eyebrow: 'Resume · Experience · Skills',
    title: 'Frontend & Fullstack Developer',
    intro:
      'Fokus auf moderne Webanwendungen, skalierbare Frontend-Architektur, UI/UX und saubere technische Auslieferung – von der Konzeption bis zum produktiven Deployment.',
    tags: ['React / Next.js', 'Angular', 'C# / .NET', 'UI / UX', 'CI/CD & Deployment']
  };

  personalInfo = {
    name: 'Deniz Yavuzkaya',
    location: 'Oberstraße 39, 74927 Eschelbronn',
    email: 'denizyavuzkaya@gmail.com',
    phone: '+49 176 821 55 891',
    website: 'www.dy-dev.de',
    github: 'github.com/OGDeniz'
  };

  quickFacts = [
    'Produktive Webprojekte mit React, Next.js und Angular',
    'Deployment auf Linux-Servern mit Docker, PM2 und GitHub Actions',
    'Technischer Fokus auf UI/UX, Performance, SEO und saubere Architektur'
  ];

  featuredExperience: ResumeEntry[] = [
    {
      period: '2025 – heute',
      title: 'Fullstack Developer & Co-Founder',
      subtitle: 'KAOS Media',
      highlight: 'Agentur, Webentwicklung, Deployment, SEO',
      details: [
        'Entwicklung und Deployment vollständiger Unternehmenswebsites und digitaler Systeme',
        'Umsetzung moderner Frontend-Architekturen mit React, Next.js, Angular und TypeScript',
        'Aufbau performanter Deployments mit GitHub Actions, PM2, SSH/rsync und Linux-Servern',
        'SEO-nahe technische Umsetzung mit Meta-Tags, Open Graph, JSON-LD, Canonicals und Sitemap-Generierung',
        'Tracking- und Conversion-nahe Integrationen wie GA4, Scroll-Depth-Tracking und DSGVO-konforme Cookie-Lösungen'
      ]
    },
    {
      period: '2022 – 2024',
      title: 'Projektbasierte Softwareentwicklung',
      subtitle: 'SRH Heidelberg · Ausbildung & Projektpraxis',
      highlight: 'C#/.NET, SQL, OOP, Anforderungsanalyse',
      details: [
        'Entwicklung von Anwendungen mit C#/.NET und SQL',
        'Objektorientierte Modellierung mit Klassen, Interfaces sowie Trennung von Logik und Daten',
        'Analyse fachlicher Anforderungen und Überführung in strukturierte technische Lösungen',
        'Dokumentation, Teamarbeit und Präsentation von Projektergebnissen'
      ]
    }
  ];

  projects = [
    {
      title: 'KAOS Media',
      type: 'Web / Agentur',
      link: 'https://kaosmedia.de'
    },
    {
      title: 'RP Schließtechnik',
      type: 'Web / Next.js',
      link: 'https://www.schluesselrp.de'
    },
    {
      title: 'BürokratieKompass',
      type: 'Web / Angular SSR',
      link: 'https://www.buerokratiekompass.de'
    },
    {
      title: 'Osteopathie Weichselfelder',
      type: 'Web / React',
      link: 'https://www.osteopathie-weichselfelder.de'
    }
  ];

  education: ResumeEntry[] = [
    {
      period: '2022 – 10/2024',
      title: 'Ausbildung zum Informatiker für Game- und Multimediaentwicklung',
      subtitle: 'SRH Hochschule Heidelberg'
    },
    {
      period: '2004 – 2006',
      title: 'Fachschulreife',
      subtitle: 'Handelslehranstalt Bruchsal'
    },
    {
      period: '1998 – 2004',
      title: 'Copernicus Gymnasium',
      subtitle: 'Philippsburg'
    }
  ];

  skillGroups: SkillGroup[] = [
    {
      title: 'Frontend',
      icon: '🧩',
      skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SCSS / SASS']
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: ['C# / .NET', 'ASP.NET', 'Node.js', 'Express.js', 'REST APIs', 'SQL', 'MongoDB']
    },
    {
      title: 'UI/UX & SEO',
      icon: '🎨',
      skills: ['Responsive Design', 'UX/UI', 'Performance', 'Technical SEO', 'Meta / Open Graph', 'JSON-LD']
    },
    {
      title: 'Deployment & DevOps',
      icon: '🚀',
      skills: ['Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD', 'PM2', 'Nginx', 'SSH / rsync']
    }
  ];

  tools = [
    'Visual Studio',
    'JetBrains Rider',
    'Git / GitHub',
    'Docker',
    'Nginx',
    'Linux Server',
    'Blender',
    'Unity',
    'Adobe Photoshop',
    'Premiere Pro'
  ];

  languages = [
    { language: 'Deutsch', level: 'Muttersprache' },
    { language: 'Türkisch', level: 'Muttersprache' },
    { language: 'Englisch', level: 'Fließend' }
  ];

  qualifications = [
    'Führerschein Klasse B',
    'Staplerschein',
    'Kranführerausbildung',
    'Ausbildung zum Gefahrgutbeauftragten'
  ];

  backgroundExperience: ResumeEntry[] = [
    {
      period: '2010 – 2011',
      title: 'Kameramann',
      subtitle: 'TR1 TV GmbH, Duisburg'
    },
    {
      period: '2011 – 2012',
      title: 'Geschäftsführer',
      subtitle: 'Friseursalon Yavuzkaya, Landshut'
    },
    {
      period: '2012 – 2014',
      title: 'Friseur',
      subtitle: 'Coiffeur Velly, Bruchsal'
    },
    {
      period: '2015 – 2016',
      title: 'Elternzeit'
    },
    {
      period: '2016 – 08/2020',
      title: 'Staplerfahrer',
      subtitle: 'Polytec GmbH, Kraichtal'
    },
    {
      period: '2020 – 2021',
      title: 'Versand',
      subtitle: 'SEW Eurodrive, Graben-Neudorf'
    }
  ];

  interests = ['Basketball', 'Kochen', 'Gaming', 'Familienaktivitäten'];

  readonly skillIconMap: Record<string, string> = {
    'React': 'devicon-react-original colored',
    'Next.js': 'devicon-nextjs-plain',
    'Angular': 'devicon-angular-plain colored',
    'TypeScript': 'devicon-typescript-plain colored',
    'JavaScript': 'devicon-javascript-plain colored',
    'Tailwind CSS': 'devicon-tailwindcss-plain colored',
    'SCSS / SASS': 'devicon-sass-plain colored',
    'C# / .NET': 'devicon-csharp-plain colored',
    'ASP.NET': 'devicon-dot-net-plain colored',
    'Node.js': 'devicon-nodejs-plain colored',
    'Express.js': 'devicon-express-original',
    'MongoDB': 'devicon-mongodb-plain colored',
    'SQL': 'devicon-mysql-plain colored',
    'Docker': 'devicon-docker-plain colored',
    'Docker Compose': 'devicon-docker-plain colored',
    'GitHub Actions': 'devicon-github-original',
    'Nginx': 'devicon-nginx-plain colored',
  };

  trackByTitle(index: number, item: ResumeEntry) {
    return `${item.title}-${item.period}-${index}`;
  }

  trackBySkillGroup(index: number, item: SkillGroup) {
    return item.title ?? index;
  }

  trackByLanguage(index: number, item: { language: string; level: string }) {
    return item.language ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (typeof item === 'string' || typeof item === 'number') return item;
    return index;
  }
}
