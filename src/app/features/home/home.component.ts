import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimateDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _particles: { x: number; y: number; size: number; duration: number }[] = [];

  stats = [
    { label: 'Fokus', value: 'Frontend & Fullstack' },
    { label: 'Stack', value: 'Angular · React · C#' },
    { label: 'Anspruch', value: 'UX · Performance · Clean Code' }
  ];

  private router = inject(Router);

  ngOnInit(): void {
    this.generateParticles(8);
  }

  get particles() {
    return this._particles;
  }

  private generateParticles(count = 6) {
    this._particles = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 80,
      duration: 6 + Math.random() * 8
    }));
  }

  scrollToProjects() {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.router.navigate(['/projects']);
  }
}
