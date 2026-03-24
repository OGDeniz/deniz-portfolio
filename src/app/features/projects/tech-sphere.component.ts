import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tag3D {
  text: string;
  color: 'default' | 'primary' | 'accent' | 'secondary';
  style: { transform: string; opacity: string; fontSize: string };
}

@Component({
  selector: 'app-tech-sphere',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sphere-scene">
      <div class="sphere-glow"></div>
      <div class="sphere-pivot">
        <div
          *ngFor="let tag of tags3d"
          class="sphere-word"
          [class.sphere-word--primary]="tag.color === 'primary'"
          [class.sphere-word--accent]="tag.color === 'accent'"
          [class.sphere-word--secondary]="tag.color === 'secondary'"
          [ngStyle]="tag.style"
        >{{ tag.text }}</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .sphere-scene {
      position: relative;
      width: 480px;
      height: 480px;
      perspective: 900px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sphere-glow {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(0, 194, 209, 0.06) 0%,
        rgba(143, 91, 255, 0.04) 40%,
        transparent 70%
      );
      pointer-events: none;
    }

    .sphere-pivot {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      animation: sphereSpin 28s linear infinite;
    }

    @keyframes sphereSpin {
      0%   { transform: rotateY(0deg)   rotateX(15deg); }
      100% { transform: rotateY(360deg) rotateX(15deg); }
    }

    .sphere-word {
      position: absolute;
      left: 50%;
      top: 50%;
      white-space: nowrap;
      font-size: inherit;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--clr-text-dark);
      border: 1px solid rgba(255, 255, 255, 0.07);
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(6px);
      padding: 0.28em 0.65em;
      border-radius: 3px;
      translate: -50% -50%;
      pointer-events: none;
      user-select: none;
      transition: none;
    }

    .sphere-word--primary {
      color: var(--clr-primary);
      border-color: var(--clr-primary-20);
      background: var(--clr-primary-05);
    }

    .sphere-word--accent {
      color: var(--clr-accent-light);
      border-color: var(--clr-accent-20);
      background: var(--clr-accent-05);
    }

    .sphere-word--secondary {
      color: var(--clr-secondary-light);
      border-color: var(--clr-secondary-20);
      background: var(--clr-secondary-05);
    }
  `]
})
export class TechSphereComponent implements OnInit {
  private readonly wordList: { text: string; color: Tag3D['color'] }[] = [
    { text: 'Frontend',    color: 'primary'   },
    { text: 'Angular',     color: 'primary'   },
    { text: 'React',       color: 'default'   },
    { text: 'Next.js',     color: 'default'   },
    { text: 'TypeScript',  color: 'accent'    },
    { text: 'Fullstack',   color: 'primary'   },
    { text: 'C# · .NET',   color: 'default'   },
    { text: 'UX / UI',     color: 'secondary' },
    { text: 'SCSS',        color: 'default'   },
    { text: 'Performance', color: 'accent'    },
    { text: 'Node.js',     color: 'default'   },
    { text: 'SEO',         color: 'secondary' },
    { text: 'Vite',        color: 'default'   },
    { text: 'REST API',    color: 'default'   },
    { text: 'Canvas',      color: 'accent'    },
    { text: 'Git',         color: 'default'   },
  ];

  tags3d: Tag3D[] = [];

  ngOnInit(): void {
    const n    = this.wordList.length;
    const R    = 178;
    const PHI  = Math.PI * (3 - Math.sqrt(5)); // golden angle ~137.5°

    this.tags3d = this.wordList.map(({ text, color }, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = PHI * i;

      const x  = Math.cos(theta) * r;
      const z  = Math.sin(theta) * r;

      const px = +(x * R).toFixed(1);
      const py = +(y * R).toFixed(1);
      const pz = +(z * R).toFixed(1);

      // depth cues based on initial z (sphere will rotate, effect animates naturally)
      const opacity  = Math.max(0.25, Math.min(1.0,  0.55 + z * 0.4));
      const fontSize = Math.max(0.72, Math.min(1.0,  0.84 + z * 0.18));

      return {
        text,
        color,
        style: {
          transform: `translate3d(${px}px, ${py}px, ${pz}px)`,
          opacity:   opacity.toFixed(2),
          fontSize:  `${fontSize.toFixed(2)}rem`,
        }
      };
    });
  }
}
