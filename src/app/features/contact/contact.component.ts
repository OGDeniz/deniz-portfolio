import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact">
      <h1>Contact</h1>
      <p>Placeholder Contact component.</p>
    </section>
  `,
  styles: [`.contact{padding:1rem}`]
})
export class ContactComponent {}
