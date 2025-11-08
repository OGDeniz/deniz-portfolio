
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Entry {
  period: string;
  title: string;
  institution?: string;
  company?: string;
  details?: string[];
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl:'./resume.component.scss'

})

export class ResumeComponent {
  personalInfo = {
    name: 'Deniz Yavuzkaya',
    birthDate: '16.04.1987',
    birthPlace: 'Nürnberg',
    familyStatus: 'getrennt lebend (3 Kinder)',
    address: 'Oberstraße 74927 Eschelbronn',
    email: ' denizyavuzkaya@gmail.com',
    phone: ' +49 176 821 55 891'
  };

  education: Entry[] = [
    {
      period: '2022 – 10/2024',
      title: 'Ausbildung zum Informatiker für Game‑ und Multimedia‑Entwicklung',
      institution: 'SRH‑Hochschule Heidelberg'
    },
    {
      period: '2004 – 2006',
      title: 'Handelslehranstalt (Fachschulreife)',
      institution: 'Bruchsal'
    },
    {
      period: '1998 – 2004',
      title: 'Copernicus Gymnasium (Klassen 5–10)',
      institution: 'Philippsburg'
    }
  ];

  vocationalTraining: Entry[] = [
    {
      period: '2008 – 2010',
      title: 'Ausbildung zum Mediendesigner Bild & Ton',
      institution: 'NG Productions, Duisburg',
      details: [
        'Regieassistenz',
        'Live‑TV‑Produktion',
        'Kundenbetreuung',
        'Technisches Management'
      ]
    }
  ];

  workExperience: Entry[] = [
    {
      period: '2006 – 2008',
      title: 'Lagerist',
      company: 'Simon Hegele GmbH, Karlsdorf',
      details: [
        'Kommissionierung',
        'Verpackung',
        'Wareneingangskontrolle',
        'Gefahrgutbeauftragter'
      ]
    },
    {
      period: '2010 – 2011',
      title: 'Kameramann',
      company: 'TR1 TV GmbH, Duisburg'
    },
    {
      period: '2011 – 2012',
      title: 'Geschäftsführer',
      company: 'Friseursalon Yavuzkaya, Landshut'
    },
    {
      period: '2012 – 2014',
      title: 'Friseur',
      company: 'Coiffeur Velly, Bruchsal'
    },
    { period: '2015 – 2016', title: 'Elternzeit' },
    {
      period: '2016 – 08/2020',
      title: 'Staplerfahrer',
      company: 'Polytec GmbH, Kraichtal'
    },
    {
      period: '2020 – 2021',
      title: 'Versand',
      company: 'SEW Eurodrive, Graben‑Neudorf'
    },
    {
      period: '2022 – 10/2024',
      title: 'Ausbildung Fachinformatiker Game‑ & Multimediaentwicklung',
      company: 'SRH‑Hochschule Heidelberg'
    }
  ];

  qualifications = [
    'Ausbildung zum Gefahrgutbeauftragten',
    'Kranführerausbildung',
    'Staplerschein',
    'Führerschein Klasse B'
  ];

  languages = [
    { language: 'Deutsch', level: 'Muttersprache' },
    { language: 'Türkisch', level: 'Muttersprache' },
    { language: 'Englisch', level: 'Sehr gute Kenntnisse in Wort und Schrift' }
  ];

  skills = [
    'Visual Studio / JetBrains Rider / Android Studio',
    'Unity Engine',
    'HTML, CSS/SCSS, JavaScript, TypeScript, C#, Kotlin, Java, SQL und PHP',
    '.NET Core / ASP.NET Core',
    'React, Angular, Vue.js',
    'Bootstrap, SCSS/SASS, Tailwind CSS',
    'Node.js, Next.js',
    'SQL (MS SQL Server, MySQL, MariaDB) & NoSQL (MongoDB)',
    'Android Development (Kotlin/Java)',
    'Blender',
    'Adobe Photoshop, Illustrator, InDesign, Animate',
    'Microsoft Office (Word, Excel, PowerPoint, Project, Access)',
    'Adobe Premiere Pro, Final Cut',
    'Projektmanagement: SCRUM, UML, DevOps',
    'Ausgeprägte Organisationsfähigkeit',
    'Teamarbeit & Eigenständigkeit'
  ];

  hobbies = ['Basketball spielen', 'Kochen', 'Familienaktivitäten', 'Gaming'];

  // trackBy functions used by the template to improve ngFor performance
  trackByTitle(index: number, item: Entry) {
    return item.title ?? index;
  }

  trackByExperience(index: number, item: Entry) {
    // combine title and period to create a reasonably unique key
    return `${item.title ?? ''}::${item.period ?? index}`;
  }

  trackByLanguage(index: number, item: { language: string; level: string }) {
    return item.language ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (item === null || item === undefined) return index;
    // if primitive, return as key, otherwise fallback to index
    if (typeof item === 'string' || typeof item === 'number') return item as unknown as string | number;
    return index;
  }
}
