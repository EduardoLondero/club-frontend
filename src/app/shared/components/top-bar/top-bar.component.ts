import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  imports: [CommonModule],
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  menuOpen: boolean = false;
  dropdownOpen = {
    institucional: false,
    club: false,
  };

  isAuthenticated: boolean = false; 

  constructor(private router: Router, private cdr: ChangeDetectorRef, private authService: AuthService) {}

  roleId :number = 0 ;

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const role = this.authService.getUserRole();
      this.roleId = role; 
      console.log('Role ID:', this.roleId);  
    }
  }
  

  checkAuthStatus(): void {
    const token = localStorage.getItem('authToken'); 
    console.log('Token:', token);
    if (token) {
      this.isAuthenticated = true;  
    } else {
      this.isAuthenticated = false;
    }
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleDropdown(menu: string) {
    this.dropdownOpen[menu as keyof typeof this.dropdownOpen] = !this.dropdownOpen[menu as keyof typeof this.dropdownOpen];
  }

  onDropdownClick(link: string) {
    this.router.navigate([link]);
    this.closeMenu();
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
    this.closeMenu();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
    this.closeMenu();
  }

  toggleAuthState() {
    if (this.isAuthenticated) {
      this.authService.logout();
    }
    this.checkAuthStatus(); 
    this.cdr.detectChanges(); 
  }


  
}
