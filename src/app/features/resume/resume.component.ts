import { Component } from '@angular/core';

@Component({
  selector: 'app-resume', // Selector, um die Komponente zu identifizieren und in Templates zu verwenden
  standalone: true, // Kennzeichnet die Komponente als eigenständig, ohne dass sie in einem Modul deklariert werden muss
  template: `
    <section class="resume">
      <h1>Resume</h1>
      <p>Placeholder Resume component.</p>
    </section>
  `, // Template der Komponente, definiert das HTML-Markup
  styles: [`.resume{padding:1rem}`]
})
export class ResumeComponent {}
