import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { Pages } from '../models/pages';
import { CentroCusto } from '../models/centro-custo';
import { DestinationEmail } from '../models/report/destination-email';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }

  findById(id: string): Observable<CentroCusto> {

    return this.http.get<CentroCusto>(`${API_CONFIG.centrocustos}/${id}`);
  }
  insert(p: CentroCusto) {
    return this.http.post(`${API_CONFIG.centrocustos}`, p, {
      observe: 'response',
      responseType: 'text'
    });
  }

  getAll(): Observable<CentroCusto[]> {
    return this.http.get<CentroCusto[]>(`${API_CONFIG.centrocustos}`);

  }
  save(p: CentroCusto) {
    console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.http.put(`${API_CONFIG.centrocustos}/${p.id}`, p).subscribe(
        res => {
          this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
        }
      )
      this.spinner.hide();
    }, 100);

  }

  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${API_CONFIG.centrocustos}/viewpdf`, httpOptions);
  }
  sendMail(e:DestinationEmail){
    console.log(e);
   return this.http.put(`${API_CONFIG.centrocustos}/sendmail`, e);
}
}
