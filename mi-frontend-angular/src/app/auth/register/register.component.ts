import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

import {
  trigger,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-register',
  imports: [MatInputModule, MatIconModule, NgIf, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('buttonPulse', [
      transition('* => *', [
        animate('1200ms ease-in-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ]))
      ])
    ])
  ]
})

export class RegisterComponent  {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;
 

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.pattern(/^\+?[0-9\s\-]{7,20}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    });
  }
 

  onSubmit() {
    if (this.registerForm.invalid) return;
  
    this.isLoading = true;
  
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('¡Registro exitoso! Revisa tu correo electrónico 📩');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Hubo un problema al registrar');
      }
    });
  }
  
  //errorers formulario registro
  getFieldError(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || control.valid || !control.touched) return '';
  
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('email')) return 'Debes ingresar un correo válido';
    if (control.hasError('minlength')) return 'Debe tener al menos 8 caracteres';
    if (control.hasError('confirmed')) return 'Las contraseñas no coinciden';
  
    return 'Formato inválido';
  }
  
}

