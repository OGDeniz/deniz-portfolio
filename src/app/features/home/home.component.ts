import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: #0a0a0f; color: white;">
      <div style="text-align: center; max-width: 800px;">
        <h1 style="font-size: 4rem; margin-bottom: 1rem; background: linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Deniz Yavuzkaya
        </h1>
        <p style="font-size: 1.5rem; color: #a1a1aa; margin-bottom: 2rem;">
          Full-Stack Developer
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a routerLink="/projects" style="padding: 1rem 2rem; background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; text-decoration: none; border-radius: 8px;">
            Projekte ansehen
          </a>
          <a routerLink="/contact" style="padding: 1rem 2rem; border: 1px solid #8b5cf6; color: white; text-decoration: none; border-radius: 8px;">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent {}
