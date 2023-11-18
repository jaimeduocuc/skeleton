import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'recordarpass',
    loadChildren: () => import('./recordarpass/recordarpass.module').then( m => m.RecordarpassPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'seccion',
    loadChildren: () => import('./seccion/seccion.module').then( m => m.SeccionPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'seccionalumno',
    loadChildren: () => import('./seccionalumno/seccionalumno.module').then( m => m.SeccionalumnoPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./page404/page404.module').then( m => m.Page404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
