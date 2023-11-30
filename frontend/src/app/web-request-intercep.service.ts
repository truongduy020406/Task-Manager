import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebRequestIntercepService implements HttpInterceptor {

  constructor(private authService : AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = this.addAuthoservice(req)

      //call next
      return next.handle(req).pipe(
        catchError((error :HttpErrorResponse) => {
          console.log(error)
          if(error.status === 401){
            this.authService.logout();
          }
          return throwError(error);    
        })  
      )
  }

  addAuthoservice(req: HttpRequest<any>){
      const token = this.authService.getAccessToken();

      if(token){
          return req.clone({
            setHeaders:{
              'x-access-token':token
            }
          })
      }
      return req;
  }

}
