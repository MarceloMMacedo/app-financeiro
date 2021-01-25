import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { GrupoFinanceiro } from '../models/grupo-financeiro';
@Injectable({
  providedIn: 'root'
})
export class HistoricopadraosaidaService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }



  findById(id: string): Observable<GrupoFinanceiro> {

    return this.http.get<GrupoFinanceiro>(`${API_CONFIG.historicopadraosaidas}/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.historicopadraosaidas}`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<GrupoFinanceiro[]> {
    return this.http.get<GrupoFinanceiro[]>(`${API_CONFIG.historicopadraosaidas}`);
  }
  save(p: GrupoFinanceiro) {
    this.spinner.show();
    setTimeout(() => {
      return this.http.put(`${API_CONFIG.historicopadraosaidas}/${p.id}`, p).subscribe(
        res => {
          this.spinner.hide();
          this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      
        }
      )
    }, 100);
  }
  async remove(p) {
    this.http.delete(`${API_CONFIG.historicopadraosaidas}/${p}`).subscribe();
  }

}
