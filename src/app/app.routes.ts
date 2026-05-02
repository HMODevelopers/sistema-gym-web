import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
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
import { NotAuthorizedComponent } from './features/public/not-authorized/not-authorized.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '403', component: NotAuthorizedComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recepcion', component: RecepcionComponent, canActivate: [permissionGuard], data: { permissions: ['accesos.ver', 'accesos.validar'] } },
      { path: 'clientes', component: ClientesComponent, canActivate: [permissionGuard], data: { permissions: ['clientes.ver'] } },
      { path: 'planes', component: PlanesComponent, canActivate: [permissionGuard], data: { permissions: ['planes.ver'] } },
      { path: 'membresias', component: MembresiasComponent, canActivate: [permissionGuard], data: { permissions: ['membresias.ver'] } },
      { path: 'pagos', component: PagosComponent, canActivate: [permissionGuard], data: { permissions: ['pagos.ver'] } },
      { path: 'accesos', component: AccesosComponent, canActivate: [permissionGuard], data: { permissions: ['accesos.ver'] } },
      { path: 'reportes', component: ReportesComponent, canActivate: [permissionGuard], data: { permissions: ['reportes.ver'] } },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [permissionGuard], data: { permissions: ['usuarios.ver'] } },
      { path: 'roles', component: RolesComponent, canActivate: [permissionGuard], data: { permissions: ['roles.ver'] } },
      { path: 'sucursales', component: SucursalesComponent, canActivate: [permissionGuard], data: { permissions: ['sucursales.ver'] } },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
