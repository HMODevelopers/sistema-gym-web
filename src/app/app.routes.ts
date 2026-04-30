import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { RecepcionPageComponent } from './features/recepcion/pages/recepcion-page/recepcion-page.component';
import { ClientesPageComponent } from './features/clientes/pages/clientes-page/clientes-page.component';
import { PlanesPageComponent } from './features/planes/pages/planes-page/planes-page.component';
import { MembresiasPageComponent } from './features/membresias/pages/membresias-page/membresias-page.component';
import { PagosPageComponent } from './features/pagos/pages/pagos-page/pagos-page.component';
import { AccesosPageComponent } from './features/accesos/pages/accesos-page/accesos-page.component';
import { ReportesPageComponent } from './features/reportes/pages/reportes-page/reportes-page.component';
import { UsuariosPageComponent } from './features/usuarios/pages/usuarios-page/usuarios-page.component';
import { RolesPageComponent } from './features/roles/pages/roles-page/roles-page.component';
import { SucursalesPageComponent } from './features/sucursales/pages/sucursales-page/sucursales-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'recepcion', component: RecepcionPageComponent },
      { path: 'clientes', component: ClientesPageComponent },
      { path: 'planes', component: PlanesPageComponent },
      { path: 'membresias', component: MembresiasPageComponent },
      { path: 'pagos', component: PagosPageComponent },
      { path: 'accesos', component: AccesosPageComponent },
      { path: 'reportes', component: ReportesPageComponent },
      { path: 'usuarios', component: UsuariosPageComponent },
      { path: 'roles', component: RolesPageComponent },
      { path: 'sucursales', component: SucursalesPageComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
