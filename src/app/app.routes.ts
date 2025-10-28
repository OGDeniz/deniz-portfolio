import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then((m) => m.ProjectsComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component').then((m) => m.SkillsComponent)
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume.component').then((m) => m.ResumeComponent)
  },
  {
    path: 'play-lost-files',
    loadComponent: () => import('./features/lazyLoading/play-lost-files/play-lost-files.component').then(m => m.PlayLostFilesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent)
  },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
