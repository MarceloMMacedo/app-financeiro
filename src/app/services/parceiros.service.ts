import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { BaseDto } from '../models/dto/base-dto';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Pessoa } from '../models/pessoa';
import { UtilsService } from './utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class ParceirosService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService, ) {

  }

  findNamePage(name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {
    let rota = API_CONFIG.baseUrl + '/parceiros' + '/page?name=' + name + '&page=' + page +
      '&linesPerPage=' + linesPerPage +
      '&orderBy=' + orderBy + '&direction=' + direction;
    console.log(rota);
    return this.http.get<Pages>(rota);
  }


  findperfil(email: string): Observable<BaseDto> {
    console.log(email);
    return this.http.get<BaseDto>(`${API_CONFIG.parceiros}/email?value=${email}`);
  }

  findById(id: string): Observable<Pessoa> {

    return this.http.get<Pessoa>(`${API_CONFIG.parceiros}/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.parceiros}`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${API_CONFIG.parceiros}/baseall`);

  }
  save(p: Pessoa) {
    console.log(p);
    this.spinner.show();

    return this.http.put(`${API_CONFIG.parceiros}/${p.id}`, p).subscribe(
      res => {
        setTimeout(() => {
          this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')

          this.spinner.hide();
        }, 100);
      }
    )

  }

  uploadPicture(p: Pessoa, event, prefixoAvatar: string): Pessoa {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
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
      const rota = API_CONFIG.parceiros + '/' + p.id + '/picture';
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
    return p;
  }
  getrules(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.parceiros}/perfils`);
  }
  getfuncoes(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.parceiros}/funcoes`);
  }
}
