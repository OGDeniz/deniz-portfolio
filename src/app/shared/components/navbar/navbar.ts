import { Component, HostBinding, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  // ▶️ Diese Zeile fehlte:
  readonly brand = 'Deniz Y.';         // oder was du anzeigen willst

  menuOpen = signal(false);

  @HostBinding('class.scrolled') scrolled = false;
  @HostListener('window:scroll') onScroll() { this.scrolled = window.scrollY > 4; }

  readonly items = [
    { label: 'Home', path: '', exact: true },
    { label: 'Projekte', path: 'projects' },
    { label: 'Skills', path: 'skills' },
    { label: 'Lebenslauf', path: 'resume' },
    { label: 'Kontakt', path: 'contact' }
  ];

  toggle() { this.menuOpen.update(v => !v); }
  closeOnNavigate() { this.menuOpen.set(false); }
}
