import { Component, HostBinding, HostListener, signal, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, AsyncPipe, ThemeToggleComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {
  readonly brand = 'Deniz Yavuzkaya';
  private navService = inject(NavigationService);
  activeLink$ = this.navService.activeLink$;

  menuOpen = signal(false);

  @HostBinding('class.scrolled') scrolled = false;
  @HostListener('window:scroll') onScroll() { this.scrolled = window.scrollY > 4; }

  readonly items = [
    { id: 'home', label: 'Home', path: '/', exact: true },
    { id: 'projects', label: 'Projekte', path: '/projects' },
    { id: 'skills', label: 'Skills', path: '/skills' },
    { id: 'resume', label: 'Lebenslauf', path: '/resume' },
    { id: 'contact', label: 'Kontakt', path: '/contact' }
  ];

  ngOnInit(): void {
    // Registriere Navigation Links beim Service
    this.navService.registerLinks(
      this.items.map(item => ({
        id: item.id,
        label: item.label,
        href: item.path
      }))
    );
  }

  toggle() { this.menuOpen.update(v => !v); }
  closeOnNavigate() { this.menuOpen.set(false); }

  navigateTo(id: string) {
    this.navService.scrollToSection(id);
    this.closeOnNavigate();
  }
}
