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
import { ContasBancaria } from '../models/contas-bancaria';

@Injectable({
  providedIn: 'root'
})
export class BancomovimentoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }

  findById(id: string): Observable<ContasBancaria> {

    return this.http.get<ContasBancaria>(`${API_CONFIG.contasbanco}/${id}`);
  }
  insert(p: ContasBancaria) {
    return this.http.post(`${API_CONFIG.contasbanco}`, p, {
      observe: 'response',
      responseType: 'text'
    });
  }

  getAll(): Observable<ContasBancaria[]> {
    return this.http.get<ContasBancaria[]>(`${API_CONFIG.contasbanco}`);

  }
  save(p: ContasBancaria) {
    console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.http.put(`${API_CONFIG.contasbanco}/${p.id}`, p).subscribe(
        res => {
          this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
        }
      )
      this.spinner.hide();
    }, 100);

  }
}
