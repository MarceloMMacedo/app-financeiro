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
import { AgregadoFinanceiro } from '../models/agregado-financeiro';

@Injectable({
  providedIn: 'root'
})
export class AgregadofinanceiroService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService, ) {

  }
 
 
 
  findById( id: string): Observable<AgregadoFinanceiro> {

    return this.http.get<AgregadoFinanceiro>(`${API_CONFIG.baseUrl}/agregadosfinanceiro/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/agregadosfinanceiro`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<AgregadoFinanceiro[]> {
    return this.http.get<AgregadoFinanceiro[]>(`${API_CONFIG.baseUrl}/agregadosfinanceiro`);

  }
  save(p: AgregadoFinanceiro) {
    console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/agregadosfinanceiro/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
   //     this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    ) 
  }
  async remove(p) {
    this.http.delete(`${API_CONFIG.baseUrl}/agregadosfinanceiro/${p}` ).subscribe();
  }
  
}
