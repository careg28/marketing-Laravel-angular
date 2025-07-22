import {
  Component, Input, Output, EventEmitter, OnInit, inject
} from '@angular/core';
import {
  FormBuilder, Validators, ReactiveFormsModule,
  FormArray, FormGroup
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Package } from '../../../core/models/package.model';
import { PackageFeature } from '../../../core/models/package-feature.model';
import { PackageService } from '../../../core/services/package.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-package-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './package-form.component.html',
  styleUrl: './package-form.component.css'
})
export class PackageFormComponent implements OnInit {
  @Input() packageData?: Package;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private packageService = inject(PackageService);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    features: this.fb.array<FormGroup>([])
  });

  loading = false;
  editMode = false;
  packageId?: number;

  ngOnInit() {
    if (this.packageData) {
      this.editMode = true;
      this.packageId = this.packageData.id;

      this.form.patchValue({
        name: this.packageData.name,
        description: this.packageData.description,
        price: this.packageData.price
      });

      this.features.clear();

      this.packageData.features?.forEach(feature => {
        this.addFeature(feature.label, feature.included, feature.id);
      });
    } else {
      this.features.clear();
      this.addFeature(); // Crea al menos una característica por defecto
    }
  }

  get features(): FormArray<FormGroup> {
    return this.form.get('features') as FormArray<FormGroup>;
  }

  addFeature(label: string = '', included: boolean = true, id: number = 0) {
    const featureGroup = this.fb.group({
      id: [id],
      label: [label, [Validators.required, Validators.maxLength(80)]],
      included: [included]
    });
    this.features.push(featureGroup);
    this.cdr.detectChanges(); // fuerza redibujado
  }

  removeFeature(index: number) {
    console.log('Eliminando característica', index);
    this.features.removeAt(index);
    this.cdr.detectChanges();
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const raw = this.form.value;

    const features: PackageFeature[] = (raw.features ?? []).map((f: any) => ({
      id: f.id && f.id !== 0 ? f.id : undefined, // ✅ solo se envían IDs válidos
      package_id: this.packageId ?? 0,
      label: f.label,
      included: f.included ?? true
    }));

    const values: Partial<Package> = {
      name: raw.name ?? '',
      description: raw.description ?? '',
      price: Number(raw.price ?? 0),
      features
    };

    const request = this.editMode && this.packageId
      ? this.packageService.update(this.packageId, values)
      : this.packageService.create(values);

    request.subscribe({
      next: () => {
        this.saved.emit();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
