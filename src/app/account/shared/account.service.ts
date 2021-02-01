
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { LocalUser } from 'src/app/models/local_user';
import { API_CONFIG } from 'src/app/config/api.config';
import { Pessoa } from '../../models/pessoa';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from 'src/app/services/company.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { BaseDto } from 'src/app/models/dto/base-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    public storage: StorageService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  login(credentials: { email: string, senha: string }) {

    let rota: Boolean = false;


    this.authenticates(credentials)
      .subscribe(response => {
        this.successfulLogin(response.headers.get('Authorization'), response.headers.get('ID_Company'));
        this.funcionarioService.findemail(credentials.email).subscribe(
          rest1 => {
    
             
            this.storage.setIdUser(rest1);
          }
        );
        rota = true;
        this.router.navigate(['']);
      },
        error => { });
        this.router.navigate(['']);
      
  }
  refreshToken() {
   
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  setCompany(idCompany: string) {
  }

  successfulLogin(authorizationValue: string, idCompany$: string) {
 

    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub,
      idCompany: idCompany$,
      //   empresa: JSON.stringify(empse)
    };
    this.storage.setLocalUser(user);
  }

  successfulCompany(c) {
    this.storage.setCompany(c);
  }

  /* successfulCompany() {
     this.companyService.getCompany().subscribe(
       rest => {
         this.storage.setCompany(rest);
         console.log(rest);
       }
     )
   }
 */
  authenticates(credentials: { email: string, senha: string }) {



    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      credentials,
      {
        observe: 'response',
        responseType: 'text'

      });

  }
  logout() {
    this.storage.setLocalUser(null);
    this.storage.setIdUser(null);
  }
}
