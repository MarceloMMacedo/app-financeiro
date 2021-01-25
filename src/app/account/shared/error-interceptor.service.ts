import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { Router} from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';



@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {


  constructor(
    private accountService: AccountService,
    public storage: StorageService,
    private router:Router,private utilService:UtilsService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return (next.handle(req)
      .pipe(catchError(error => {
        let errorMessage;
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
       // this.utilService.createNotification('error', 'Alerta', errorMessage)
        ////console.log("Erro detectado pelo interceptor:");
        ////console.log((error.statusText));
        if(error.statusText=="Unknown Error"){
          let errorMessage;
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        //  this.utilService.createNotification('error', 'Alerta', errorMessage)
        //  this.router.navigate(['acessonegado']);
      //    this.toastr.error('Problema de Acesso', 'Sistema indisponível');
        }

        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
          this.router.navigate(['acessonegado']);

        //  this.utilService.createNotification('error','Problema de Acesso', 'Sistema ou servidor indisponível');

        }
        if (!errorObj.status) {
          console.log((errorObj));
          errorObj = JSON.parse(errorObj);

        }

        ////console.log("Erro detectado pelo interceptor:");

        ////console.log(errorObj);
       // this.toastr.error('Digite seu email e senha', '');
        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403(errorObj);
            break;

          case 422:
            this.handle422(errorObj);
            break;

          case 500:

            this.handle500(errorObj);
            //this.accountService.logout();
            break;
          default:
            this.handleDefaultEror(errorObj);
        }

        return Observable.throw(errorObj);
      }
      )
      )
    ) as any;
  }
  handle500(errorObj) {
    let errorMessage;
    errorMessage = `Código do erro: ${errorObj.status}, ` + `menssagem: ${errorObj.message}`;
    this.utilService.createNotification('error', 'Alerta', `${errorObj.message}`)
    // this.storage.setLocalUser(null);
     ////console.log("error" + errorObj.message + 'Erro ' + errorObj.status + ': ' + errorObj.error);
     //this.toastr.error(errorObj.message,  errorObj.status + ': ' + errorObj.error);
   }
  handle403(errorObj) {
   // this.storage.setLocalUser(null);
   ////console.log(errorObj.message);
    ////console.log("error" + errorObj.message + 'Erro ' + errorObj.status + ': ' + errorObj.error);
   // this.toastr.error(errorObj.message,  errorObj.status + ': ' + errorObj.error);

    this.router.navigate(['acessonegado']);

  }

  handle401() {

   // this.toastr.error('Email ou senha incorretos', 'Erro 401: falha de autenticação');

    /* let alert = this.alertCtrl.create({
       title: 'Erro 401: falha de autenticação',
       message: 'Email ou senha incorretos',
       enableBackdropDismiss: false,
       buttons: [
         {
           text: 'Ok'
         }
       ]
     });
     alert.present();*/
  }

  handle422(errorObj) {
    let s: string = '';
    for (var i = 0; i < errorObj.errors.length; i++) {
      s = s + '<p><strong>' + errorObj.errors[i].fieldName + "</strong>: " + errorObj.errors[i].message + '</p>';
    }

   // this.toastr.error(s, 'Erro 422: Validação');
    /*let alert = this.alertCtrl.create({
      title: 'Erro 422: Validação',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();*/
  }

  handleDefaultEror(errorObj) {
   // this.toastr.error(errorObj.message, 'Erro ' + errorObj.status + ': ' + errorObj.error);
    /*let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();*/
  }

  /*private listErrors(messages: FieldMessage[]): string {
    let s: string = '';
    for (var i = 0; i < messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }*/
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
