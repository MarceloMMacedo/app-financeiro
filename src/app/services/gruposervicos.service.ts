import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable} from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GrupoFinanceiro } from '../models/grupo-financeiro';

@Injectable({
  providedIn: 'root'
})
export class GruposervicosService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }



  findById( id: string): Observable<GrupoFinanceiro> {

    return this.http.get<GrupoFinanceiro>(`${API_CONFIG.gruposervicos}/${id}`);
  }
  insert(p ) {
    return this.http.post(`${API_CONFIG.gruposervicos}` , p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<GrupoFinanceiro[]> {
    return this.http.get<GrupoFinanceiro[]>(`${API_CONFIG.gruposervicos}`);

  }

  deleteAgregado(id){
    this.http.delete(`${API_CONFIG.gruposervicos}/${id}`+'/deleteagregado').subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }

 async save(p: GrupoFinanceiro) {

  //console.log(p);
      this.http.put(`${API_CONFIG.gruposervicos}/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }



}
