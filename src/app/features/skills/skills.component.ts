import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  // Liste Ihrer Skills; Werte sind Prozentangaben (0–100)
  technicalSkills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Angular', level: 80 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Game Development', level: 70 },
    { name: 'Performance Optimierung', level: 85 }
  ];

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
