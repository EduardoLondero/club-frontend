import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-location.component.html',
  styleUrl: './admin-location.component.css'
})
export class AdminLocationComponent implements OnInit {
  localities: any[] = [];
  provinces: any[] = [];
  activeTable: 'localities' | 'provinces' = 'localities';
  showModal: boolean = false;
  modalType: 'locality' | 'province' | null = null;
  newLocality = { name: '', postalCode: 0, oProvinciaId: '', users: []};
  newProvince = { nameprovince: '', localities: [] };
  showConfirmModal: boolean = false;
  itemToDelete: { type: 'locality' | 'province', id: number } | null = null;
  errorMessage: string = '';
  modalType2: string = '';
  editLocality: any = {}; 
  editProvince: any = {}; 
  
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocalities();
    this.loadProvinces();
  }


  loadLocalities(): void {
    this.locationService.getAllLocalities().subscribe((response) => {
      if (response && response.data) {
        console.log(response.message); 
        this.localities = response.data; 
      } else {
        console.error("Formato de respuesta incorrecto", response);
      }
    });
  }

  loadProvinces(): void {
    this.locationService.getProvinces().subscribe((response) => {
      if (response && response.data) {
        console.log(response.message); 
        this.provinces = response.data; 
      } else {
        console.error("Formato de respuesta incorrecto", response);
      }
    });
  }

  openEditModal(type: string, item: any) {
    this.modalType2 = type;
    if (type === 'locality') {
      this.editLocality = { ...item }; 
    } else if (type === 'province') {
      this.editProvince = { ...item };
    }
    this.showModal = true; 
  }


  showTable(type: 'localities' | 'provinces') {
    this.activeTable = type;
  }

  openModal(type: 'locality' | 'province') {
    this.modalType2 = type;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newLocality = { name: '', postalCode: 0, oProvinciaId: '', users: [] };
    this.newProvince = { nameprovince: '' , localities: [] };
  }

  updateLocality() {
    const localityId = this.editLocality.id;
    this.locationService.updateLocality(localityId, this.editLocality).subscribe(
      response => {
        console.log('Localidad actualizada', response);
        this.closeModal();  
        this.loadLocalities();  
      },
      error => {
        this.errorMessage = 'Hubo un error al actualizar la localidad. Intenta de nuevo.';
        console.error('Error al actualizar localidad', error);
      }
    );
  }

  updateProvince() {
    const provinceId = this.editProvince.id;
    this.locationService.updateProvince(provinceId, this.editProvince).subscribe(
      response => {
        console.log('Provincia actualizada', response);
        this.closeModal();  
        this.loadProvinces();  
      },
      error => {
        this.errorMessage = 'Hubo un error al actualizar la provincia. Intenta de nuevo.';
        console.error('Error al actualizar provincia', error);
      }
    );
  }
  
  createLocality(): void {
    console.log('Datos que se enviarán:', this.newLocality);
  
    this.locationService.createLocality({
      name: this.newLocality.name,
      postalCode: this.newLocality.postalCode,
      oProvinciaId: this.newLocality.oProvinciaId 
    }).subscribe({
      next: () => {
        this.loadLocalities();
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error desconocido';
        console.error('Error al crear localidad:', error);
      }
    });
  }
  

  createProvince() {
    this.locationService.createProvince(this.newProvince).subscribe({
      next: () => {
        this.loadProvinces();
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error desconocido al crear provincia'; 
        console.error('Error al crear provincia:', error);
      }
    });
  }

   confirmDelete(type: 'locality' | 'province', id: number) {
    this.itemToDelete = { type, id };
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.itemToDelete = null;
  }


  deleteItem() {
    if (!this.itemToDelete) return; 
  
    if (this.itemToDelete.type === 'locality') {
      this.locationService.deleteLocality(this.itemToDelete.id).subscribe({
        next: () => {
          this.loadLocalities();
          this.closeConfirmModal();
        },
        error: (err) => {
          this.errorMessage = err?.message || 'Ocurrió un error al eliminar la localidad.';
          console.error('Error:', err);
        }
      });
    } else {
      this.locationService.deleteProvince(this.itemToDelete.id).subscribe({
        next: () => {
          this.loadProvinces();
          this.closeConfirmModal();
        },
        error: (err) => {
         
          this.errorMessage = err?.message || 'Ocurrió un error al eliminar la provincia.';
          console.error('Error:', err);
        }
      });
    }
  }
}
  