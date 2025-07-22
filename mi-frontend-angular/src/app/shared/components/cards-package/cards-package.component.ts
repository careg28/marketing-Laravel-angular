import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';
import { Package } from '../../../core/models/package.model';
import { PackageService } from '../../../core/services/package.service';


@Component({
  selector: 'app-cards-package',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
    NgFor,
    AnimateInViewDirective,
    MatIconModule,
    NgIf
  ],
  templateUrl: './cards-package.component.html',
  styleUrl: './cards-package.component.css'
})
export class CardsPackageComponent implements OnInit {
  private paqueteService = inject(PackageService);
  paquetes: Package[] = [];

  ngOnInit(): void {
    this.paqueteService.getAll().subscribe({
      next: paquetes => {
        this.paquetes = paquetes;
      },
      error: err => console.error('Error al cargar paquetes desde base de datos', err),
      complete: () => console.log('Paquetes recibidos:', this.paquetes)
    });
  }
}
