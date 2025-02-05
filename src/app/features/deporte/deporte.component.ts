
import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../services/sport.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./deporte.component.css']
})
export class DeporteComponent implements OnInit {
  deportes: any[] = []; 

  
  constructor(private router: Router, private sportsService: SportsService) {}

  ngOnInit() {
    this.sportsService.getSports().subscribe(
      (response) => {
        console.log('Deportes cargados:', response);
        this.deportes = response.data;
      },
      (error) => {
        console.error('Error al cargar los deportes:', error);
      }
    );
  }

  verInfo(nombre: string):void {
    this.router.navigate(['deporte',nombre]);
  }
}