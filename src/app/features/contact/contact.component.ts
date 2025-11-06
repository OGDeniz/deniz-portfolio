import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
    privacy: [false, Validators.requiredTrue]
  });

  submitted = false;
  sending = false;

  ngOnInit() {
    // EmailJS Initialization
    emailjs.init('pGbIbZ9dq3TiPFdcI');
  }

  async submit() {
    this.submitted = true;
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
        alert('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
        this.form.reset({ privacy: false });
        this.submitted = false;
      } else {
        throw new Error('Email send failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Versenden. Bitte versuchen Sie es später erneut.');
    } finally {
      this.sending = false;
    }
  }

  get c() {
    return this.form.controls;
  }
}
