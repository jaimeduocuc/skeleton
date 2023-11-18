import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false; // variable global

  constructor (private router: Router,){

  }

  setAuthenticationStatus(status:boolean){// metodo booleano que contiene un status
    this.isAuthenticated=status; // el status se le pasa a la variable local
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  const isAuthenticated = false;// se le pasa un false para que cuando la validación del login sea
                                  // correcta se cambie a true

  if(this.isAuthenticated){
    return true

  }else {

    return this.router.navigate(['/login'])
  
  }}; 
  
}
