import { Component } from '@angular/core';
import { TopBarComponent } from '../shared/components/top-bar/top-bar.component';
import { SideBarComponent } from '../shared/components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [CommonModule,RouterModule,TopBarComponent, SideBarComponent],
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
