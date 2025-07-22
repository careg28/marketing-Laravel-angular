import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
//ver animaaciones con lottie
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { BtnEscribenosComponent } from "../../shared/components/btn-escribenos/btn-escribenos.component";

@Component({
  selector: 'app-nuestro-proceso',
  standalone: true, // Importante si lo usas de forma aislada
  templateUrl: './nuestro-proceso.component.html',
  styleUrls: ['./nuestro-proceso.component.css'],
  imports: [
    NgFor,
    MatIconModule,
    MatStepperModule,
    BtnEscribenosComponent
],
  animations: [
    trigger('heroFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('stepperFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms 200ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('stepContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class NuestroProcesoComponent {
  pasos = [
    {
      icono: 'search',
      titulo: 'Exploramos tu mundo',
      descripcion: 'Sumergimos en tu sector y tu audiencia para descubrir lo que hace única tu marca.',
      imagen: '/assets/proceso/1-investigacion.svg'
    },
    {
      icono: 'design_services',
      titulo: 'Diseñamos tu esencia',
      descripcion: 'Convertimos ideas en diseños funcionales que enamoran visualmente y comunican con claridad.',
      imagen: '/assets/proceso/2-diseno.svg'
    },
    {
      icono: 'code',
      titulo: 'Programamos tu visión',
      descripcion: 'Desarrollamos tu sitio con tecnología escalable, segura y pensada para crecer contigo.',
      imagen: '/assets/proceso/3-desarrollo.svg'
    },
    {
      icono: 'rocket_launch',
      titulo: 'Lanzamos tu proyecto',
      descripcion: 'Tu web lista para despegar: optimizada, preparada para posicionarse y con autonomía total.',
      imagen: '/assets/proceso/4-lanzamiento.svg'
    }
  ];
  
}

