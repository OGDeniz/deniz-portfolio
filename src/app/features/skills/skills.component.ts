import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  // Frontend Skills
  frontendSkills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Angular', level: 80 },
    { name: 'React', level: 80 },
    { name: 'Vue.js', level: 75 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Responsive Design', level: 85 }
  ];

  // Backend Skills
  backendSkills = [
    { name: 'Node.js', level: 80 },
    { name: 'ASP.NET Core', level: 75 },
    { name: 'SQL', level: 70 },
    { name: 'PHP', level: 50 },
    { name: 'NoSQL (MongoDB)', level: 80 },
    { name: 'Game Development', level: 70 },
    { name: 'Performance Optimierung', level: 85 }
  ];

  // Tools & Technologien
  toolsSkills = [
    { name: 'Git & GitHub', level: 85 },
    { name: 'Visual Studio / Rider', level: 85 },
    { name: 'Android Studio', level: 75 },
    { name: 'Figma', level: 80 },
    { name: 'Adobe Suite (Photoshop, Illustrator)', level: 75 },
    { name: 'Blender 3D', level: 70 },
    { name: 'Docker', level: 65 }
  ];

  // Soft Skills
  softSkills = [
    { name: 'Kommunikation', level: 90 },
    { name: 'Teamfähigkeit', level: 88 },
    { name: 'Problemlösung', level: 85 },
    { name: 'Kreativität', level: 83 },
    { name: 'Organisation & Zeitmanagement', level: 80 },
    { name: 'Eigenverantwortung', level: 90 },
    { name: 'Empathie', level: 80 }
  ];
}
