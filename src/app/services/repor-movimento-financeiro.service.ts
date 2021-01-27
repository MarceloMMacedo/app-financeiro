import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { DemosntrativoFinanceiroDto } from '../models/report/demosntrativo-financeiro-dto';
import { ReportDemostrativoFinancerio } from '../models/report/report-demostrativo-financerio';
import { ResumoMovimentoFinaneiro } from '../models/report/resumo-movimento-finaneiro';
import { Resumocontas } from '../models/report/resumocontas';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReporMovimentoFinanceiroService {

  constructor(public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService) { }


  getAll(): Observable<ResumoMovimentoFinaneiro> {
    return this.http.get<ResumoMovimentoFinaneiro>(`${API_CONFIG.repormovimentofinanceiro}`);
  }
  /*reportdemostrativofinancerio(): Observable<ReportDemostrativoFinancerio[]> {
    return this.http.get<ReportDemostrativoFinancerio[]>(`${API_CONFIG.repormovimentofinanceiro}/reportdemostrativofinancerio`);
  }
*/
  async reportdemostrativofinancerio(): Promise<ReportDemostrativoFinancerio[]>{
    let listaDados: ReportDemostrativoFinancerio[] = [];
    const dadosApi = await this.http.get<ReportDemostrativoFinancerio[]>(`${API_CONFIG.repormovimentofinanceiro}/reportdemostrativofinancerio`)
    .toPromise().then(dataApi=> {
      dataApi.forEach(dado => {
                      listaDados.push(dado);
       });
    }
    );

    return listaDados;
}
  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/printdemonstrativo`, httpOptions);
  }
  //todos report
  viewpddemonstrativosintetico(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/viewpddemonstrativosintetico`, httpOptions);
  }
  viewpddemonstrativosinteticoexercicio(exercico: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/viewpddemonstrativosinteticoexercicio?exercico=${exercico}`, httpOptions);
  }
  getviewsinteticoperiodo(exercico: number, mes: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json' 
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/printdemonstrativoperiodo?exercico=${exercico}&mes=${mes}`, httpOptions);
  }
  demonstrativoatualperiodo1(exercico: number, mes: number): DemosntrativoFinanceiroDto {
    let demosntrativoFinanceiroDto: DemosntrativoFinanceiroDto = {} as DemosntrativoFinanceiroDto;
    this.http.get<DemosntrativoFinanceiroDto>(`${API_CONFIG.repormovimentofinanceiro}/demonstrativoatualperiodo?exercicio=${exercico}&mes=${mes}`).subscribe(
      rest => demosntrativoFinanceiroDto = rest
    );
    return demosntrativoFinanceiroDto;
  }
  async demonstrativoatualperiodo(exercico: number, mes: number): Promise<DemosntrativoFinanceiroDto> {
    let listaDados: DemosntrativoFinanceiroDto={};
    const dadosApi = await this.http.get<DemosntrativoFinanceiroDto>(`${API_CONFIG.repormovimentofinanceiro}/demonstrativoatualperiodo?exercicio=${exercico}&mes=${mes}`)
    .toPromise().then(dataApi => {
      listaDados=dataApi

      });


    return listaDados;
  }

  getviewlivrocaixa(datainicio: Date, datafim: Date): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json' 
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/livrocaixa?datainicio=${datainicio}&datafim=${datafim}`, httpOptions);
  }
}
