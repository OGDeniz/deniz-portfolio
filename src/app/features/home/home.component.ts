import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="home">
      <h1>Home</h1>
      <p>Placeholder Home component.</p>
    </section>
  `,
  styles: [`.home{padding:1rem}`]
})
export class HomeComponent {}
