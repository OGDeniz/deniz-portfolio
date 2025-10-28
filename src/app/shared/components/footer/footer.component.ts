import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})

export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projekte', path: '/projects' },
    { label: 'Lebenslauf', path: '/resume' },
    { label: 'Kontakt', path: '/contact' }
  ];

  socialLinks = [
    {
      icon: 'fa-brands fa-github',
      url: 'https://github.com/DenizYavuzkaya' // passe die URL an
    },
    {
      icon: 'fa-brands fa-linkedin',
      url: 'https://www.linkedin.com/in/deinprofil/' // passe die URL an
    }
  ];

 trackByPath(index: number, link: { path: string; label: string }) {
    return link.path;
  }

}
