import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { AnimateInViewDirective } from '../../../shared/directives/animate-in-view.directive';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PackageService } from '../../../core/services/package.service';
import { Package } from '../../../core/models/package.model';

@Component({
  selector: 'app-cards-package',
  imports: [MatCard, MatCardModule, CurrencyPipe, NgFor, MatIconModule,RouterLink,NgIf],
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
      error: err => console.error('Error al cargar paquetes', err),
      complete: () => console.log('Paquetes cargados:', this.paquetes)
    });
  }
}

