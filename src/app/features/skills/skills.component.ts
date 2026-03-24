import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

interface SkillCategory {
  title: string;
  eyebrow: string;
  description: string;
  skills: string[];
  icon: 'stack' | 'frontend' | 'server' | 'seo' | 'engineering';
  accent: 'cyan' | 'violet' | 'blue' | 'emerald' | 'amber';
}

interface HeroFact {
  label: string;
  icon: 'stack' | 'ui' | 'server';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  heroFacts: HeroFact[] = [
    { label: 'Fullstack mit Frontend-Fokus', icon: 'stack' },
    { label: 'Skalierbare UI-Systeme', icon: 'ui' },
    { label: 'Deployment bis Livegang', icon: 'server' }
  ];

  skillCategories: SkillCategory[] = [
    {
      eyebrow: 'Core Stack',
      title: 'Technologien, die ich produktiv einsetze',
      description:
        'Mein technisches Fundament für moderne Webanwendungen, Frontend-Systeme und Fullstack-Projekte.',
      icon: 'stack',
      accent: 'cyan',
      skills: [
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'Angular',
        'C# / .NET',
        'Node.js / Express.js',
        'ASP.NET',
        'SQL',
        'MongoDB / NoSQL'
      ]
    },
    {
      eyebrow: 'Frontend & UX',
      title: 'Interfaces mit Struktur, Performance und klarer Nutzerführung',
      description:
        'Ich entwickle Frontends nicht nur visuell, sondern mit Fokus auf Komponentenarchitektur, Responsiveness und UX.',
      icon: 'frontend',
      accent: 'violet',
      skills: [
        'Component Architecture',
        'Responsive Design',
        'UI / UX Design',
        'HTML',
        'CSS / SCSS / SASS',
        'Tailwind CSS',
        'Framer Motion',
        'Performance Optimierung'
      ]
    },
    {
      eyebrow: 'Backend & Infrastructure',
      title: 'Deployment, Server und produktive Auslieferung',
      description:
        'Von der Entwicklung bis zum Livegang: Infrastruktur, Prozesse und technische Stabilität gehören für mich zum Projekt dazu.',
      icon: 'server',
      accent: 'blue',
      skills: [
        'Docker',
        'Docker Compose',
        'Git / GitHub',
        'GitHub Actions',
        'CI / CD',
        'PM2',
        'SSH / rsync',
        'Nginx',
        "Let's Encrypt / SSL",
        'Linux Server Deployment'
      ]
    },
    {
      eyebrow: 'SEO, Tracking & Delivery',
      title: 'Technische Sichtbarkeit und saubere Projekt-Auslieferung',
      description:
        'Ich denke Websites nicht nur als Oberfläche, sondern auch in Bezug auf Sichtbarkeit, Tracking und saubere technische Einbindung.',
      icon: 'seo',
      accent: 'emerald',
      skills: [
        'Technical SEO',
        'Meta Tags',
        'Open Graph',
        'Canonical URLs',
        'JSON-LD Structured Data',
        'Sitemap Generierung',
        'GA4 Event Tracking',
        'Scroll-Depth Tracking',
        'DSGVO-konforme Cookie-Implementierung',
        'SSR mit Next.js & Angular'
      ]
    },
    {
      eyebrow: 'Engineering Mindset',
      title: 'Wie ich Software entwickle',
      description:
        'Mein Arbeitsstil basiert auf sauberer Struktur, klaren Verantwortlichkeiten und verständlicher Implementierung.',
      icon: 'engineering',
      accent: 'amber',
      skills: [
        'Objektorientierte Programmierung (OOP)',
        'Modulare Architekturen',
        'Clean Code',
        'TypeScript Strict Mode',
        'Analyse fachlicher Anforderungen',
        'Strukturierte Dokumentation',
        'Agile Arbeitsweise',
        'Lernbereitschaft',
        'Eigenständiges Arbeiten',
        'Problem Solving'
      ]
    }
  ];
}
