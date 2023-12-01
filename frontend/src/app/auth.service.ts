import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private webService:WebRequestService,private router:Router) { }
  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),  
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        const userId = res.body._id;
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
  
        if (userId && accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("LOGGED IN!");
        } else {
          console.error("Invalid response format. Tokens are missing.");
        }
      })
    );
  }
  signUp(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),  
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        const userId = res.body._id;
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
  
        if (userId && accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("SIGNUP SUCCESS!");
        } else {
          console.error("Invalid response format. Tokens are missing.");
        }
      })
    );
  }
  logout(){
    this.removesetSession()
    this.router.navigate(['/login']);
  }


  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }


  private setSession(userId:string,accessToken:string, refreshToken:string){
      localStorage.setItem('user-id',userId);
      localStorage.setItem('x-access-token',accessToken);
      localStorage.setItem('x-refresh-token',refreshToken);

  }

  private removesetSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');

  }
  
}
