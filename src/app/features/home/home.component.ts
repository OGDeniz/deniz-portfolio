import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  roles = ['Full-Stack Developer', 'Frontend Engineer', 'UI/UX Enthusiast'];
  private currentRoleIndex = 0;
  private roleIntervalId: number | undefined;

  // particles used by the template's *ngFor
  private _particles: { x: number; y: number; size: number; duration: number }[] = [];

  // simple stats example
  stats = [
    { label: 'Projekte', value: 12 },
    { label: 'Erfahrung', value: '5 Jahre' },
    { label: 'Kunden', value: 8 }
  ];

  private router = inject(Router);

  ngOnInit(): void {
    this.generateParticles(8);
    // rotate role every 3s so the template's currentRole() updates over time
    // Guard against server-side rendering where `window` is not available
    if (typeof window !== 'undefined' && typeof window.setInterval === 'function') {
      this.roleIntervalId = window.setInterval(() => {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      }, 3000) as unknown as number;
    }
  }

  ngOnDestroy(): void {
    if (this.roleIntervalId) {
      clearInterval(this.roleIntervalId);
    }
  }

  currentRole(): string {
    return this.roles[this.currentRoleIndex];
  }

  // Called from template: *ngFor="let p of particles()"
  particles() {
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
    // fallback to route if section not on the same page
    this.router.navigate(['/projects']);
  }
}
