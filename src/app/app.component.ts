import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { LayoutComponent } from './layout/layout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, TopBarComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
