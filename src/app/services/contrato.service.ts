import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { BaseDto } from '../models/dto/base-dto';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pages } from '../models/pages';
import { Patrimonio } from '../models/patrimonio';
import { MovimentoFinanceiro } from '../models/movimento-financeiro';
import { Contrato } from '../models/contrato';
@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }
  patrimonios(): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(`${API_CONFIG.contratos}/patrimonios`);

  }
  deleteequipamento(id) {

    this.http.delete(`${API_CONFIG.contratos}/${id}` + '/deleteequipamento').subscribe(
      res => {
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados ecluido com sucesso')
      }
    )
  }

  findperfil(email: string): Observable<BaseDto> {
    console.log(email);
    return this.http.get<BaseDto>(`${API_CONFIG.contratos}/email?value=${email}`);
  }

  movimentocontrato(id:number): Observable<MovimentoFinanceiro> {
    return this.http.get<MovimentoFinanceiro>(`${API_CONFIG.contratos}/${id}/movimentocontrato`);
  }

  findById(id: string): Observable<Contrato> {

    return this.http.get<Contrato>(`${API_CONFIG.contratos}/${id}`);
  }
  regerarparcelas(id: string, idcliente, idgrupofinanceiro): Observable<Contrato> {

    return this.http.get<Contrato>(`${API_CONFIG.contratos}/${id}/${idcliente}/${idgrupofinanceiro}/regerarparcelas`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.contratos}`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${API_CONFIG.contratos}/baseall`);

  }
  save(p: Contrato) {
    //this.spinner.show();
    return this.http.put(`${API_CONFIG.contratos}/${p.id}`, p).subscribe(
      res => {
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')

      }
    )

  }

  uploadPicture(p: Contrato, event, prefixoimageContrato: string): Contrato {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    if (event.target.files && event.target.files) {
      const foto = event.target.files[0];
      console.log(prefixoimageContrato + p.id + '.' + foto.name.split('.').pop());
      let id = prefixoimageContrato + p.id + '.' + foto.name.split('.').pop();

      if (p.imageContrato == null || p.imageContrato == 'null' || p.imageContrato == ''
        || p.imageContrato != id) {
        p.imageContrato = id;
      }
      const formData = new FormData();
      formData.set('file', foto, p.imageContrato);
      console.log(formData);
      const rota = API_CONFIG.contratos + '/' + p.id + '/picture';
      this.http.post(rota, formData, { observe: 'response', responseType: 'text' })
        .subscribe(
          res => {
            p.imageContratoView = res.body;

            this.spinner.hide();
          },
          error => {
          }
        );
    }
    return p;
  }
  getrules(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.contratos}/perfils`);
  }
  getfuncoes(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.contratos}/funcoes`);
  }
}
