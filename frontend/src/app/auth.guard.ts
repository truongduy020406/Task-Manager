import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId = localStorage.getItem('user-id');
      let accesstoken  = localStorage.getItem('x-access-token')
      let refreshtoken = localStorage.getItem('x-refresh-token')
      if(userId && accesstoken && refreshtoken){
        return true;
      }else{
        return false;
      }
      
  }
  
}
