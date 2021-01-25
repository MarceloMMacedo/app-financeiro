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
import { Modelo } from '../models/modelo';
@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService, ) {

  }

findNamePage(  name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {
    let rota = API_CONFIG.baseUrl + '/modelos' +  '/page?name=' + name + '&page=' + page +
      '&linesPerPage=' + linesPerPage +
      '&orderBy=' + orderBy + '&direction=' + direction;
    //console.log(rota);
    return this.http.get<Pages>(rota);
  }


  findAllPorName(name: string): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${API_CONFIG.baseUrl}/modelos/name?value=${name}`);
  }

  findById( id: string): Observable<Modelo> {

    return this.http.get<Modelo>(`${API_CONFIG.baseUrl}/modelos/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/modelos`, p, { observe: 'response', responseType: 'text' });
  }

  getAll(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${API_CONFIG.baseUrl}/modelos`);

  }
  save(p: Modelo) {
    //console.log(p);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/modelos/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide();
        this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
      }
    )
  }

  uploadPicture( p: Modelo, event, prefixoAvatar: string): Modelo {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    if (event.target.files && event.target.files) {
      const foto = event.target.files[0];
      //console.log(prefixoAvatar + p.id + '.' + foto.name.split('.').pop());
      let id = prefixoAvatar + p.id + '.' + foto.name.split('.').pop();

      if (p.avatar == null || p.avatar == 'null' || p.avatar == ''
        || p.avatar != id) {
        p.avatar = id;
      }
      const formData = new FormData();
      formData.set('file', foto, p.avatar);
      //console.log(formData);
      const rota = API_CONFIG.baseUrl + '/modelos/picture';
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



  filterModelo(mainModelo: Modelo[], fintText: string): Modelo[] {
    let retorno: Modelo[] = [];
    retorno = mainModelo.filter((person) => JSON.stringify(person).toLowerCase().indexOf(fintText.toLowerCase()) !== -1
    )
    return retorno;

  }
  savenewName(name: string): Modelo {
    let m: Modelo = {} as Modelo;
    let id;

    //console.log(m);
    this.insert(m).subscribe(
      res => {
       m.id=parseFloat(res.body);
      }
    )

    //console.log(m);
    return m;
  }
}
