import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { throwError } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(

    private modal: NzModalService,
    private utilService: UtilsService,

  ) { }
   // Manipulação de erros
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
       this.utilService.createNotification('error','Alerta','Ocorreu um erro: '+errorMessage)

    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      this.utilService.createNotification('error','Alerta', errorMessage)

    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
