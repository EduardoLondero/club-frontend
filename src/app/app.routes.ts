import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/registration/registration.component';
import { LayoutComponent } from './layout/layout.component';
import { DeporteComponent } from './features/deporte/deporte.component';
import { MembresiaComponent } from './features/membresia/membresia.component';
import { DeporteDetalleComponent } from './features/deporte-detalle/deporte-detalle.component';
import { ManageProfileComponent } from './features/manage-profile/manage-profile.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { AdminSportsComponent } from './features/admin-sports/admin-sports.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './features/history/history.component';
import { SportComissionComponent } from './features/sport-comission/sport-comission.component';
import { StadiumComponent } from './features/stadium/stadium.component';
import { SedeComponent } from './features/sede/sede.component';
import { NewsComponent } from './features/news/news.component';
import { AdminLocationComponent } from './features/admin-location/admin-location.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'deporte', component: DeporteComponent},
  {path: 'membresia', component:MembresiaComponent},
  {path: 'deporte/:nombre', component:DeporteDetalleComponent, canActivate : [AuthGuard]},
  {path: 'profile', component: ManageProfileComponent,canActivate : [AuthGuard]},
  {path: 'admin', component: AdminDashboardComponent,canActivate : [AuthGuard]},
  {path: 'adminsports', component: AdminSportsComponent,canActivate : [AuthGuard]},
  {path: 'historia', component:HistoryComponent},
  {path: 'directiva', component:SportComissionComponent},
  {path: 'estadio', component: StadiumComponent},
  {path:'sedes', component: SedeComponent},
  {path: 'noticias', component: NewsComponent},
  {path: 'adminLocation', component: AdminLocationComponent,canActivate : [AuthGuard]},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
