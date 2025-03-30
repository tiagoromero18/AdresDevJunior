import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../services/acquisition.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acquisition-list',
  templateUrl: './acquisition-list.component.html',
  styleUrls: ['./acquisition-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AcquisitionListComponent implements OnInit {
  acquisitions: any[] = [];
  editingAcquisitionId: number | null = null;
  editedAcquisition: any = {};

  filterSupplier: string = '';
  filterStatus: string = '';
  filterServiceType: string = '';
  filterUnit: string = '';
  filterTotalValue: number | null = null;

  filteredAcquisitions: any[] = [];

  constructor(private acquisitionService: AcquisitionService) {}

  ngOnInit() {
    this.loadAcquisitions();
    this.acquisitionService.acquisitionCreated$.subscribe((acquisition) => {
      this.updateAcquisitionList(acquisition);
    });
  }

  updateAcquisitionList(newOrUpdatedAcquisition: any) {
    if (this.editingAcquisitionId) {
      this.acquisitions = this.acquisitions.map((acq) =>
        acq.id === newOrUpdatedAcquisition.id
          ? { ...newOrUpdatedAcquisition, IsActive: newOrUpdatedAcquisition.isActive }
          : acq
      );
      this.editingAcquisitionId = null;
    } else {
      this.acquisitions = [
        ...this.acquisitions,
        { ...newOrUpdatedAcquisition, IsActive: newOrUpdatedAcquisition.isActive },
      ];
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredAcquisitions = this.acquisitions.filter(acquisition => {
      const supplierMatch = !this.filterSupplier || acquisition.supplier.toLowerCase().includes(this.filterSupplier.toLowerCase());
      const statusMatch = !this.filterStatus || acquisition.IsActive.toString() === this.filterStatus;
      const serviceTypeMatch = !this.filterServiceType || acquisition.serviceType.toLowerCase().includes(this.filterServiceType.toLowerCase());
      const unitMatch = !this.filterUnit || acquisition.unit.toLowerCase().includes(this.filterUnit.toLowerCase());
      const totalValueMatch = this.filterTotalValue === null || acquisition.totalValue === this.filterTotalValue;

      return supplierMatch && statusMatch && serviceTypeMatch && unitMatch && totalValueMatch;
    });
  }

  loadAcquisitions() {
    this.acquisitionService.getAcquisitions().subscribe((data) => {
      this.acquisitions = data.map(acquisition => ({
        ...acquisition,
        IsActive: acquisition.isActive
      }));
      this.applyFilters();
    });
  }

  deactivateAcquisition(id: number) {
    if (confirm('¿Estás seguro de que quieres desactivar esta adquisición?')) {
      this.acquisitionService.deactivateAcquisition(id).subscribe(() => {
        this.acquisitions = this.acquisitions.map((acq) =>
          acq.id === id ? { ...acq, IsActive: false } : acq
        );
        this.applyFilters();
      });
    }
  }

  activateAcquisition(id: number) {
    if (confirm('¿Estás seguro de que quieres activar esta adquisición?')) {
      this.acquisitionService.activateAcquisition(id).subscribe(() => {
        this.acquisitions = this.acquisitions.map((acq) =>
          acq.id === id ? { ...acq, IsActive: true } : acq
        );
        this.applyFilters();
      });
    }
  }

  startEditing(acquisition: any) {
    if (acquisition.IsActive) {
      this.editingAcquisitionId = acquisition.id;
      this.editedAcquisition = { ...acquisition };
    } else {
      alert('No puedes editar una adquisición desactivada.');
    }
  }

  saveEdit() {
    if (this.editedAcquisition) {
      this.acquisitionService.updateAcquisition(this.editedAcquisition.id, this.editedAcquisition).subscribe({
        next: () => {
          alert('Adquisición actualizada con éxito');
          this.editingAcquisitionId = null;
          this.loadAcquisitions();
        },
        error: (err) => {
          console.error('Error al actualizar adquisición:', err);
          alert('Hubo un error al actualizar la adquisición.');
        },
      });
    }
  }

  cancelEdit() {
    this.editingAcquisitionId = null;
  }
}