import { Component, OnInit, inject } from '@angular/core';
import { PackageService } from '../../../core/services/package.service';
import { Package } from '../../../core/models/package.model';
import { PackageFormComponent } from "./package-form.component";
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.css'],
  imports: [PackageFormComponent, NgFor, CurrencyPipe, NgIf, MatIconModule]
})
export class PackagesListComponent implements OnInit {
  packages: Package[] = [];
  selectedPackage?: Package;
  showForm = false;

  private packageService = inject(PackageService);

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.packageService.getAll().subscribe(pkgs => this.packages = pkgs);
    this.showForm = false;
    this.selectedPackage = undefined;
  }

  createNew() {
    this.selectedPackage = undefined;
    this.showForm = true;
  }

  edit(pkg: Package) {
    this.selectedPackage = pkg;
    this.showForm = true;
  }

  delete(pkg: Package) {
    if (confirm('¿Eliminar este paquete?')) {
      this.packageService.delete(pkg.id).subscribe(() => this.fetch());
    }
  }

  onSaved() {
    this.fetch();
  }

  onCancelled() {
    this.showForm = false;
    this.selectedPackage = undefined;
  }
}

