import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AcquisitionService } from '../../services/acquisition.service';

@Component({
  selector: 'app-acquisition-form',
  templateUrl: './acquisition-form.component.html',
  styleUrls: ['./acquisition-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AcquisitionFormComponent implements OnInit {
  @Input() acquisitionToEdit: any;

  acquisitionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private acquisitionService: AcquisitionService
  ) {
    this.acquisitionForm = this.fb.group({
      supplier: [''],
      budget: [''],
      unit: [''],
      serviceType: [''],
      quantity: [''],
      unitValue: [''],
      totalValue: [''],
      acquisitionDate: [''],
      documentation: [''],
    });

    this.acquisitionForm.valueChanges.subscribe((values) => {
      const total = values.quantity * values.unitValue;
      this.acquisitionForm.patchValue({ totalValue: total }, { emitEvent: false });
    });
  }

  ngOnInit() {
    if (this.acquisitionToEdit) {
      this.acquisitionForm.patchValue(this.acquisitionToEdit);
    }
  }

  onSubmit() {
    if (this.acquisitionForm.valid) {
      const formData = this.acquisitionForm.getRawValue();
      console.log('Form data:', formData);

      if (formData.acquisitionDate) {
        formData.acquisitionDate = new Date(formData.acquisitionDate).toISOString();
      }

      if (this.acquisitionToEdit) {
        this.acquisitionService
          .updateAcquisition(this.acquisitionToEdit.id, formData)
          .subscribe({
            next: (updatedAcquisition) => {
              alert('Adquisición actualizada con éxito');
              this.acquisitionForm.reset();
              this.acquisitionService.announceAcquisitionCreated(updatedAcquisition); // Notifica la actualización
            },
            error: (err) => {
              console.error('Error al actualizar adquisición:', err);
              alert('Hubo un error al actualizar la adquisición.');
            },
          });
      } else {
        this.acquisitionService.createAcquisition(formData).subscribe({
          next: (newAcquisition) => {
            alert('Adquisición creada con éxito');
            this.acquisitionForm.reset();
            this.acquisitionService.announceAcquisitionCreated(newAcquisition); // Notifica la creación
          },
          error: (err) => {
            console.error('Error al crear adquisición:', err);
            alert('Hubo un error al guardar la adquisición.');
          },
        });
      }
    } else {
      alert('Formulario no válido');
    }
  }
}
