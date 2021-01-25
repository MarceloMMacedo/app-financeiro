import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AccountService } from './account.service';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public storage: StorageService,
    public accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

   let localUser = this.storage.getLocalUser();
    // //console.log('Bearer1 ' + localUser.token);
    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;//coloca cabecalho

    if (localUser && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
    
      return next.handle(authReq).pipe(catchError((error) => {
      
        if (error instanceof HttpErrorResponse) {

        }
        return throwError(error);
      }))
    }
    else {

      return next.handle(req);

    }
  }
  /* if (localStorage.getItem('token')) {
       let token = localStorage.getItem('token');
       const authReq = req.clone({
           setHeaders: {
               Authorization: token
           }
       });
       return next.handle(authReq)
           .pipe(catchError((error)=>{
               //console.log(error);
               if (error instanceof HttpErrorResponse) {
                   if (error.status === 401) {
                       this.authService.logout();
                       this.router.navigateByUrl('/auth/login');
                   }
               }
               return throwError(error);
           }))
   }
   return next.handle(req);*/
  //}
}
