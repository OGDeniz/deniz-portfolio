import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      (click)="toggleTheme()"
      [attr.aria-label]="'Switch to ' + (currentTheme === 'light' ? 'dark' : 'light') + ' mode'"
      [attr.title]="'Current theme: ' + currentTheme"
    >
      <!-- Sun Icon (für Light Mode) -->
      <svg
        *ngIf="currentTheme === 'dark'"
        class="theme-icon sun-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <!-- Moon Icon (für Dark Mode) -->
      <svg
        *ngIf="currentTheme === 'light'"
        class="theme-icon moon-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--clr-text);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      z-index: 10;

      &:hover {
        background: var(--clr-primary-10);
        color: var(--clr-primary);
      }

      &:focus-visible {
        outline: 2px solid var(--clr-primary);
        outline-offset: 2px;
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .theme-icon {
      width: 20px;
      height: 20px;
      animation: fadeInOut 0.3s ease-in-out;
    }

    @keyframes fadeInOut {
      0% {
        opacity: 0;
        transform: rotate(-180deg) scale(0);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .theme-icon {
        animation: none;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: Theme = 'system';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
