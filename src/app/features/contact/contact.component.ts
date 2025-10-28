import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
    privacy: [false, Validators.requiredTrue]
  });

  submitted = false;

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    console.log('Contact data', this.form.value);
    alert('Danke für Ihre Nachricht! Ich werde mich bald melden.');
    this.form.reset({ privacy: false });
    this.submitted = false;
  }

  get c() {
    return this.form.controls;
  }
}
