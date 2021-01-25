import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import { ContasPagarSaida } from '../models/dto/contas-pagar-saida';
import { FaturaDto } from '../models/dto/fatura-dto';
import { MovimentoFinanceiro } from '../models/movimento-financeiro';
import { Resumocontas } from '../models/report/resumocontas';
import { HandleErrorService } from './handle-error.service';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class MovimentoSaidaService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private handleError: HandleErrorService,
    private spinner: NgxSpinnerService,) {
  }

  findById(id: string): Observable<MovimentoFinanceiro> {
    return this.http.get<MovimentoFinanceiro>(`${API_CONFIG.movimentosaida}/${id}`);
  }
  getAll(exercicio): Observable<Resumocontas[]> {
    return this.http.get<Resumocontas[]>(`${API_CONFIG.movimentosaida}/resumoContasPagar?value=${exercicio}`);
  }
  exercicios(): number[] {
    let exercicios: number[];
    this.spinner.show();
    setTimeout(() => {
      this.http.get<number[]>(`${API_CONFIG.movimentosaida}/exercicios`).subscribe(
        rest => exercicios = rest
      );
      this.spinner.hide();
    }, 100);
    return exercicios;
  }
  totalpagar(): number[] {
    let totalpagar: number[];
    setTimeout(() => {
      this.http.get<number[]>(`${API_CONFIG.movimentosaida}/totalpagar`).subscribe(
        rest => totalpagar = rest
      );
    }, 100);
    return totalpagar;
  }
  Resumocontassexercico(): Observable<Resumocontas[]> {
    return this.http.get<Resumocontas[]>(`${API_CONFIG.movimentosaida}/resumocontaspagarsexercico`);
  }
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_CONFIG.movimentosaida}/events`);
  }

  /*quitarfatura(id): Observable<FaturaDto> {
    return this.http.get<FaturaDto>(`${API_CONFIG.movimentosaida}/${id}/quitarfatura`);
  }*/

  async  quitarfatura(id): Promise<FaturaDto>  {
    let listaDados: FaturaDto={};
    const dadosApi =
    await this.http.get<FaturaDto>(`${API_CONFIG.movimentosaida}/${id}/quitarfatura`)
    .toPromise().then(dataApi => {
      listaDados=dataApi
      });
    return listaDados;
  }

  async  save(p: FaturaDto) : Promise<FaturaDto>  {
    let listaDados: FaturaDto={};
    const dadosApi =
    await  this.http.put(`${API_CONFIG.movimentosaida}/quitarfatura`, p)
    .toPromise().then(dataApi => {
      listaDados=dataApi
      });
    return listaDados;
  }
  /*save(p: FaturaDto):Observable<FaturaDto> {


    return  this.http.put(`${API_CONFIG.movimentosaida}/quitarfatura`, p);
      console.log(p)
      this.http.get<FaturaDto>(`${API_CONFIG.movimentosaida}/${p.id}/quitarfatura`);

  }*/
  oncreate(conta: MovimentoFinanceiro) {

    return this.http.post(`${API_CONFIG.movimentosaida}`,
      conta,
      {
        observe: 'response',
        responseType: 'text'
      }
    );

  }
  uploadPicture(id, formData: FormData) {
    return this.http.post(`${API_CONFIG.movimentosaida}/${id}/picture`, formData, { observe: 'response', responseType: 'text' })
      .pipe(
        retry(2),
      //  catchError(this.handleError.handleError)
      ).subscribe(
        //() => this.utilService.createNotification('success', 'Operação com sucesso', '')

      )
  }
  editarMoviemnto(id) {
    return this.http.get<ContasPagarSaida>(`${API_CONFIG.movimentosaida}/${id}/editarMoviemnto`);
  }
}
