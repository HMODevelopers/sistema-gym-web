import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/public/auth/login/login.component';
import { DashboardComponent } from './features/private/dashboard/dashboard.component';
import { RecepcionComponent } from './features/private/recepcion/recepcion.component';
import { ClientesComponent } from './features/private/clientes/clientes.component';
import { PlanesComponent } from './features/private/planes/planes.component';
import { MembresiasComponent } from './features/private/membresias/membresias.component';
import { PagosComponent } from './features/private/pagos/pagos.component';
import { AccesosComponent } from './features/private/accesos/accesos.component';
import { ReportesComponent } from './features/private/reportes/reportes.component';
import { UsuariosComponent } from './features/private/usuarios/usuarios.component';
import { RolesComponent } from './features/private/roles/roles.component';
import { SucursalesComponent } from './features/private/sucursales/sucursales.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recepcion', component: RecepcionComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'membresias', component: MembresiasComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'accesos', component: AccesosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'sucursales', component: SucursalesComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
