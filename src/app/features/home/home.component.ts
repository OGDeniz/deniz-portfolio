import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  roles = ['Full-Stack Developer','Game Developer', 'Software Engineer' ,'Frontend Engineer', 'UI/UX Enthusiast'];
  private currentRoleIndex = 0;
  private roleIntervalId: ReturnType<typeof setInterval> | undefined;
  private roleChangeTimeout: ReturnType<typeof setTimeout> | undefined;
  // controls visibility for a single fade-out/fade-in cycle
  roleVisible = true;

  // particles used by the template's *ngFor
  private _particles: { x: number; y: number; size: number; duration: number }[] = [];

  // simple stats example
  stats = [
    { label: 'Projekte', value: 12 },
    { label: 'Erfahrung', value: '3 Jahre' },
    { label: 'Kunden', value: 3 }
  ];

  private router = inject(Router);

  ngOnInit(): void {
    this.generateParticles(8);
    // rotate role every 3s so the template's currentRole() updates over time
    // Guard against server-side rendering where `window` is not available
    if (typeof window !== 'undefined' && typeof window.setInterval === 'function') {
      // Controlled cycle: fade out -> change text -> fade in
      this.roleIntervalId = window.setInterval(() => {
        this.toggleRole();
      }, 3000) as unknown as ReturnType<typeof setInterval>;
    }
  }

  ngOnDestroy(): void {
    if (this.roleIntervalId !== undefined) {
      clearInterval(this.roleIntervalId as unknown as number);
    }
    if (this.roleChangeTimeout !== undefined) {
      clearTimeout(this.roleChangeTimeout as unknown as number);
    }
  }

  // Expose as getter so template can bind to property (no repeated method calls)
  get currentRole(): string {
    return this.roles[this.currentRoleIndex];
  }

  // Expose particles as getter for template access
  get particles() {
    return this._particles;
  }

  private toggleRole() {
    // start fade out
    this.roleVisible = false;
    // after fade-out duration, update index and fade in
    this.roleChangeTimeout = setTimeout(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.roleVisible = true;
    }, 450); // matches CSS transition duration (450ms)
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
