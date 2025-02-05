import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [CommonModule,RouterModule],
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
}
