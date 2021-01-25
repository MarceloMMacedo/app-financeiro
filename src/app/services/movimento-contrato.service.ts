import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { FaturaDto } from '../models/dto/fatura-dto';
import { Fatura } from '../models/fatura';
import { MovimentoFinanceiro } from '../models/movimento-financeiro';
import { Resumocontas } from '../models/report/resumocontas';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class MovimentoContratoService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService, ) {
  }

  getAll(exercicio): Observable<Resumocontas[]> {
    return this.http.get<Resumocontas[]>(`${API_CONFIG.movimentocontrato}/resumocontasrecebercontrato?value=${exercicio}`);
  }
  exercicios(): number[] {
    let exercicios: number[];
    this.spinner.show();
    setTimeout(() => {
      this.http.get<number[]>(`${API_CONFIG.movimentocontrato}/exercicios`).subscribe(
        rest => exercicios = rest
      );
      this.spinner.hide();
    }, 100);
    return exercicios;
  }
  totalpagar(): number[] {
    let totalpagar: number[];
    setTimeout(() => {
      this.http.get<number[]>(`${API_CONFIG.movimentocontrato}/totalrecebercontrator`).subscribe(
        rest => totalpagar = rest
      );
    }, 100);
    return totalpagar;
  }
  Resumocontassexercico(): Observable<Resumocontas[]> {
    return this.http.get<Resumocontas[]>(`${API_CONFIG.movimentocontrato}/resumocontasrecebercontratoexercico`);
  }
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_CONFIG.movimentocontrato}/events`);
  }

  /*quitarfatura(id): Observable<FaturaDto> {
    return this.http.get<FaturaDto>(`${API_CONFIG.movimentocontrato}/${id}/quitarfatura`);
  }
  save(p: FaturaDto) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      return this.http.put(`${API_CONFIG.movimentocontrato}/quitarfatura`, p).subscribe(
        res => {
          this.spinner.hide();
          this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
        }
      )
    }, 100);
  }*/
  async  quitarfatura(id): Promise<FaturaDto>  {
    let listaDados: FaturaDto={};
    const dadosApi =
    await this.http.get<FaturaDto>(`${API_CONFIG.movimentocontrato}/${id}/quitarfatura`)
    .toPromise().then(dataApi => {
      listaDados=dataApi
      });
    return listaDados;
  }

  async  save(p: FaturaDto) : Promise<FaturaDto>  {
    let listaDados: FaturaDto={};
    const dadosApi =
    await  this.http.put(`${API_CONFIG.movimentocontrato}/quitarfatura`, p)
    .toPromise().then(dataApi => {
      listaDados=dataApi
      });
    return listaDados;
  }
  uploadPicture(id, formData:FormData ) {
    this.spinner.show();

    let prefixoAvatar: string = 'faturaSAda';
    setTimeout(() => {
      this.spinner.hide();
      //if (event.target.files && event.target.files)
      {
        //const foto = event.target.files[0];


       // formData.set('file', foto, id);
        console.log(formData);
       // const rota = API_CONFIG.movimentocontrato + '/' + p.id + '/picture';
        this.http.post(`${API_CONFIG.movimentocontrato}/${id}/picture`, formData, { observe: 'response', responseType: 'text' })
          .subscribe();
      }
    }, 100);
  }

}
