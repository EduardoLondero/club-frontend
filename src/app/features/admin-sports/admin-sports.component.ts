import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../services/sport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-sports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sports.component.html',
  styleUrls: ['./admin-sports.component.css']
})
export class AdminSportsComponent implements OnInit {

  sports: any[] = [];
  selectedSport: any;
  showCreateModal: boolean = false;
  showDeleteModal: boolean = false;
  sportToDeleteId: number | null = null;
  errorMessage: string = '';

  constructor(private sportService: SportsService) {}

  ngOnInit(): void {
    this.loadSports();
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((sports) => {
      this.sports = sports.data;
    });
  }

  openEditModal(sport: any) {
    this.selectedSport = { ...sport };
    this.showCreateModal = false;
  }

  

  openCreateModal() {
    this.selectedSport = { sportName: '', schedule: '', scheduleEnd: '', price: 0, imageUrl: '' };
    this.showCreateModal = true;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.selectedSport = null;
  }

  createSport(): void {
    if (this.selectedSport) {

      const newSport = { 
        ...this.selectedSport, 
        memberships: []
      };

      this.sportService.createSport(newSport).subscribe(() => {
        this.loadSports();
        this.closeModal();
      }, 
      (error) => {
        this.errorMessage = error.error.message || 'Hubo un error al eliminar el deporte.';
      console.log(this.errorMessage);
    });
    }
  }


  
  updateSport(): void {
    if (this.selectedSport?.id) {
      console.log('Deporte actualizado:', this.selectedSport);
      this.sportService.updateSport(this.selectedSport.id, this.selectedSport).subscribe(() => {
        this.loadSports();
        this.closeModal();
      },
      (error) => {
        this.errorMessage = error.error.message || 'Hubo un error al eliminar el deporte.';
      console.log(this.errorMessage);
      });
    }
  }
  
  saveSport(): void {
    if (this.selectedSport?.id) {
      this.updateSport();
    } else {
      this.createSport();
    }
  }

  deleteSport(): void {
    if (this.sportToDeleteId !== null) {
      this.sportService.deleteSport(this.sportToDeleteId).subscribe(() => {
        this.loadSports(); 
        this.closeDeleteModal();
      }, error => {
        this.errorMessage = error.error.message || 'Hubo un error al eliminar el deporte.';
        console.log(this.errorMessage);
      });
    }
  }


  openDeleteModal(id: number): void {
    this.sportToDeleteId = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.sportToDeleteId = null;
  }

}
  