import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';
@Component({
  selector: 'app-testimonial-carousel',
  imports: [CarouselModule,MatCardModule,CommonModule,AnimateInViewDirective],
  templateUrl: './testimonial-carousel.component.html',
  styleUrl: './testimonial-carousel.component.css'
})
export class TestimonialCarouselComponent {
 testimonials = [
    {
      id: 't1',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Juan Pérez',
      role: 'CEO, Empresa X',
      quote: 'El equipo fue muy profesional y rápido. ¡Recomendado 100%!'
    },
    {
      id: 't2',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Ana Gómez',
      role: 'Directora de Marketing, YZ',
      quote: 'El mejor servicio que hemos contratado, diseño y comunicación perfectos.'
    },
    {
      id: 't3',
      photo: 'https://randomuser.me/api/portraits/men/76.jpg',
      name: 'Carlos López',
      role: 'CTO, Z Solutions',
      quote: 'Muy buena experiencia, entrega puntual y resultados excelentes.'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: true,
    navText: ['‹','›'],
    autoplay: false,
    smartSpeed: 600,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    },
    center: true
  };
}

