import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import emailjs from '@emailjs/browser';
import { ContactMgComponent } from './contact-mg.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective, ContactMgComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);

  hero = {
    eyebrow: 'Contact · Let’s talk',
    title: 'Lass uns über dein Projekt oder eine passende Rolle sprechen',
    intro:
      'Ob Webentwicklung, Frontend-Architektur, UI/UX oder technische Umsetzung: Ich freue mich über konkrete Anfragen, spannende Projekte und passende berufliche Möglichkeiten.'
  };

  contactCards = [
    {
      title: 'E-Mail',
      value: 'denizyavuzkaya@gmail.com',
      link: 'mailto:denizyavuzkaya@gmail.com',
      meta: 'Für Projektanfragen, Jobs und Rückfragen'
    },
    {
      title: 'Telefon',
      value: '+49 176 821 55 891',
      link: 'tel:+4917682155891',
      meta: 'Direkter Kontakt für schnelle Abstimmung'
    },
    {
      title: 'Standort',
      value: 'Eschelbronn / Rhein-Neckar',
      link: '',
      meta: 'Remote und vor Ort flexibel einsetzbar'
    },
    {
      title: 'Portfolio',
      value: 'www.dy-dev.de',
      link: 'https://www.dy-dev.de',
      meta: 'Projekte, Skills und technische Schwerpunkte'
    }
  ];

  quickFacts = [
    'Antwort in der Regel zeitnah',
    'Offen für Projekte und Festanstellungen',
    'Fokus auf Web, Frontend, UX und technische Umsetzung'
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
    privacy: [false, Validators.requiredTrue]
  });

  submitted = false;
  sending = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    emailjs.init('pGbIbZ9dq3TiPFdcI');
  }

  async submit(): Promise<void> {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) return;

    this.sending = true;

    try {
      const response = await emailjs.send(
        'service_hvda6yh',
        'template_rbosxwo',
        {
          name: this.form.value.name || '',
          email: this.form.value.email || '',
          subject: this.form.value.subject || 'Neue Kontaktanfrage',
          message: this.form.value.message || ''
        }
      );

      if (response.status === 200) {
        this.successMessage =
          'Vielen Dank für deine Nachricht. Ich melde mich so schnell wie möglich zurück.';
        this.form.reset({
          name: '',
          email: '',
          subject: '',
          message: '',
          privacy: false
        });
        this.submitted = false;
      } else {
        throw new Error('Email send failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.errorMessage =
        'Beim Versenden ist etwas schiefgelaufen. Bitte versuche es später erneut oder schreibe mir direkt per E-Mail.';
    } finally {
      this.sending = false;
    }
  }

  get c() {
    return this.form.controls;
  }

  trackByTitle(index: number, item: { title: string }) {
    return item.title ?? index;
  }

  trackByIdentity<T>(index: number, item: T): string | number {
    if (typeof item === 'string' || typeof item === 'number') return item;
    return index;
  }
}
