import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { StorageService } from "./storage.service";
import { API_CONFIG } from '../config/api.config';
import { tap, catchError } from 'rxjs/operators';
import { Pages } from '../models/pages';
import { Patrimonio } from '../models/patrimonio';
import { BaseDto } from '../models/dto/base-dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { DestinationEmail } from "../models/report/destination-email";

@Injectable({
  providedIn: 'root'
})
export class PatrimoniosService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private spinner: NgxSpinnerService,) {
  }

  findById(id: string): Observable<Patrimonio> {
    return this.http.get<Patrimonio>(`${API_CONFIG.patrimonios}/${id}`);
  }

  getAll(): Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${API_CONFIG.patrimonios}/baseall`);
  }

  getAllnowinthcontrato(): Observable<Patrimonio[]> {
    return this.http.get<Patrimonio[]>(`${API_CONFIG.patrimonios}/nowinthcontrato`);
  }
  gettypepatrimonio(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.patrimonios}/typepatrimonio`);
  }
  deleteFile(id) {
    this.http.delete(`${API_CONFIG.patrimonios}/${id}`);
  }

  uploadPicture(p: Patrimonio, event, prefixoAvatar: string): Patrimonio {

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
        const rota = API_CONFIG.patrimonios + '/' + p.id + '/picture';
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
  uploadPictureRemocao(p: Patrimonio, event, prefixoAvatar: string): Patrimonio {

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
        const rota = API_CONFIG.patrimonios + '/' + p.id + '/picturremocao';
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
  save(c: Patrimonio) {
    return this.http.put(`${API_CONFIG.patrimonios}/${c.id}`, c);
  }
  savenew(obj: Patrimonio) {

    return this.http.post(`${API_CONFIG.patrimonios}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
  gettipoPatrimonio():Observable<BaseDto[]> {
    return this.http.get<BaseDto[]>(`${API_CONFIG.patrimonios}/typepatrimonio`);
  }
  findpage(name: string, page: number, linesPerPage: number, orderBy: string, direction: string): Observable<Pages> {

    return this.http.get<Pages>(`${API_CONFIG.patrimonios}/page?name=${name}&page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`);
  }
  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${API_CONFIG.patrimonios}/viewpdf`, httpOptions);
  }
  pdfAll(){
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
   // return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/livrocaixa?datainicio=${datainicio}&datafim=${datafim}`, httpOptions);
  }
 
   sendMail(e:DestinationEmail){
     console.log(e);
    return this.http.put(`${API_CONFIG.patrimonios}/sendmail`, e);
}

}

