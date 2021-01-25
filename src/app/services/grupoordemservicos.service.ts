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
import { GrupoFinanceiro } from '../models/grupo-financeiro';
import { HistoricoPadrao } from '../models/historico-padrao';

@Injectable({
  providedIn: 'root'
})
export class GrupoordemservicosService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }

  findById(id: string): Observable<GrupoFinanceiro> {
    return this.http.get<GrupoFinanceiro>(`${API_CONFIG.baseUrl}/grupoordemservico/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/grupoordemservico`, p, { observe: 'response', responseType: 'text' });
  }
  inserths(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/grupoordemservico/hs`, p, { observe: 'response', responseType: 'text' });
  }
  getAll(): GrupoFinanceiro[] {
    let npmArrayMap: GrupoFinanceiro[] = [] as GrupoFinanceiro[];
    this.http.get<GrupoFinanceiro[]>(`${API_CONFIG.baseUrl}/grupoordemservico`).subscribe(
      (data: GrupoFinanceiro[]) => {
        data.forEach(function (value, key) {
          console.log(value);
          npmArrayMap.push(value);
        });
      })
    return npmArrayMap;

  }
  save(p: GrupoFinanceiro) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/grupoordemservico/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }
  savehs(p: HistoricoPadrao) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/grupoordemservico/hs/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }
  findNamePage(  name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {
    let rota = API_CONFIG.baseUrl + '/grupoordemservico' +  '/page?name=' + name + '&page=' + page +
      '&linesPerPage=' + linesPerPage +
      '&orderBy=' + orderBy + '&direction=' + direction;
    console.log(rota);
    return this.http.get<Pages>(rota);
  }
}

 