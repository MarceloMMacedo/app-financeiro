import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { BaseDto } from '../models/dto/base-dto';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Pessoa } from '../models/pessoa';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,) {

  }

  findNamePage(name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {
    let rota = API_CONFIG.baseUrl + '/empresas' + '/page?name=' + name + '&page=' + page +
      '&linesPerPage=' + linesPerPage +
      '&orderBy=' + orderBy + '&direction=' + direction;
    console.log(rota);
    return this.http.get<Pages>(rota);
  }


  findperfil(email: string): Observable<BaseDto> {
    console.log(email);
    return this.http.get<BaseDto>(`${API_CONFIG.baseUrl}/empresas/email?value=${email}`);
  }

  findById(id: string): Observable<Pessoa> {

    return this.http.get<Pessoa>(`${API_CONFIG.empresa}/${id}`);
  }
  async findById1(id: string): Promise<Pessoa> {
    let listaDados: Pessoa={};
    const dadosApi = await  this.http.get<Pessoa>(`${API_CONFIG.empresa}/${id}`)
    .toPromise().then(dataApi => {
      listaDados=dataApi

      });


    return listaDados;
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.empresa}`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${API_CONFIG.empresa}/baseall`);
  }

  getCompany(): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${API_CONFIG.empresa}`);
  }
  save(p: Pessoa) {
    console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();

    return this.http.put(`${API_CONFIG.empresa}/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }, 100);
  }

/*
  save(p: Pessoa) {
    console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.empresa}/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }
*/
  uploadPicture(p: Pessoa, event, prefixoAvatar: string): Pessoa {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();

      if (event.target.files && event.target.files) {
        const foto = event.target.files[0];
        console.log(prefixoAvatar + p.id + '.' + foto.name.split('.').pop());
        let id = prefixoAvatar + p.id + '.' + foto.name.split('.').pop();

        if (p.avatar == null || p.avatar == 'null' || p.avatar == ''
          || p.avatar != id) {
          p.avatar = id;
        }
        const formData = new FormData();
        formData.set('file', foto, p.avatar);
        console.log(formData);
        const rota = API_CONFIG.empresa + '/' + p.id + '/picture';
        this.http.post(rota, formData, { observe: 'response', responseType: 'text' })
          .subscribe(
            res => {
              p.avatarView = res.body;

              this.spinner.hide();
            },
            error => {
            }
          );
      }
    }, 100);
    return p;
  }
  getrules(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.baseUrl}/empresas/perfils`);
  }
}
