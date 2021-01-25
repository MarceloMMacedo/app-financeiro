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
import { Contaprovisao } from '../models/contaprovisao';

@Injectable({
  providedIn: 'root'
})
export class ContaProvisaoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }

  findById(id: string): Observable<Contaprovisao> {

    return this.http.get<Contaprovisao>(`${API_CONFIG.baseUrl}/contaprovisao/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/contaprovisao`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Contaprovisao[] {
    let npmArrayMap: Contaprovisao[] = [] as Contaprovisao[];
    this.http.get<Contaprovisao[]>(`${API_CONFIG.baseUrl}/contaprovisao`).subscribe(
      (data: Contaprovisao[]) => {
        data.forEach(function (value, key) {
          //console.log(value);
          npmArrayMap.push(value);
        });
      }) 
    return npmArrayMap;
  }
  async save(p: Contaprovisao) {
    //console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/contaprovisao/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }

  findNamePage(  name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {
    let rota = API_CONFIG.baseUrl + '/contaprovisao' +  '/page?name=' + name + '&page=' + page +
      '&linesPerPage=' + linesPerPage +
      '&orderBy=' + orderBy + '&direction=' + direction;
    //console.log(rota);
    return this.http.get<Pages>(rota);
  }
}
