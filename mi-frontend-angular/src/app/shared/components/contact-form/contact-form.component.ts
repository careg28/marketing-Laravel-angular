import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from '../../../core/services/contact.service';
import { CreateContactDto } from '../../../core/dto/create-contact.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    AnimateInViewDirective
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(800)]],
    tel: [null, [Validators.minLength(2), Validators.maxLength(100)]] // ✅ aquí se agregó el control
  });

  get estaEnHome(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }

  sent = false;
  error = '';
  loading = false;

  submitForm(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const data: CreateContactDto = {
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      message: this.form.value.message ?? '',
      tel: this.form.value.tel ?? null // ✅ y aquí se envía al backend
    };

    this.contactService.sendMessage(data).subscribe({
      next: () => {
        this.sent = true;
        this.error = '';
        this.loading = false;

        this.snackBar.open('Mensaje enviado correctamente.', 'Cerrar', { duration: 4000 });
        formDirective.resetForm();

        setTimeout(() => (this.sent = false), 4000);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.message || 'Error al enviar el mensaje';
        this.snackBar.open(this.error, 'Cerrar', { duration: 5000 });
        this.sent = false;
        this.loading = false;
      }
    });
  }
}
