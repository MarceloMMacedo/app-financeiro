import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
/*import { Company } from '../models/company/company';
import { Endereco } from '../models/Endereco';
import { CepService } from './cep.service';
import { Pessoa } from '../models/pessoas/pessoa';*/
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public http: HttpClient,
    private notification: NzNotificationService
    //public cepService: CepService 
  ) { }

  getNewId(): string {
    let d = new Date();
    let n = d.getTime();
    const chars = n + 'abcdefghijklmnopqrstuv';
    let randominputstring = '';
    for (let i = 0; i < 20; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randominputstring += chars.substring(rnum, rnum + 1);
    }
    return randominputstring;
  }

  createNotification(type, title, msg): void {
    this.notification.create(
      type, title, msg,
      { nzPlacement: 'bottomRight' }
    );
  }
  numberToReal(numero) {
    var n: number = Number(numero);
    var nume = n.toFixed(2).split('.');
    nume[0] = "R$ " + nume[0].split(/(?=(?:...)*$)/).join('.');
    return nume.join(',');
  }
  getDataCompanyCNPJ(company: Pessoa): Pessoa {
    ////console.log(this.apenasNumeros(company.cpfOnCnpj));
    this.getDataReceita(this.apenasNumeros(company.cpfOnCnpj)).subscribe(
      retorno => {
        if (retorno.status == 'OK') {
          ////console.log(retorno);
          company.enderecoPrincipal = {} as Endereco;
          company.capital_social = this.numberToReal(retorno.capital_social);
          company.data_situacao = retorno.data_situacao;
          company.natureza = retorno.natureza;
          company.natureza_juridica = retorno.natureza_juridica;
          company.code = retorno.atividade_principal[0].code;
          company.name = retorno.nome;
          company.atividade_principal = retorno.atividade_principal[0].text;
          company.nameFantasia = retorno.fantasia;

          let enderecoPrincipal: Endereco = {} as Endereco;

          company.enderecoPrincipal.bairro = retorno.bairro;
          company.enderecoPrincipal.city = retorno.municipio;
          company.enderecoPrincipal.state = retorno.uf;
          company.enderecoPrincipal.nro = retorno.numero;
          company.enderecoPrincipal.zipCode = retorno.cep;
          company.enderecoPrincipal.street = retorno.logradouro;
          company.enderecoPrincipal.complement = retorno.complemento;
          ;
          let msg = 'Consulta Realizado com Sucesso';
          let tipo = 'success'
          this.createNotification('Sucesso', 'Sucesso', msg);
        }
        else {
          this.createNotification('error', 'CNPJ inválido', "Ocorreu um erro durante a consulta, tente mais tarde!");
        }
      }
    )
    return company;
  }
  getDataPessoaCNPJ(company: Pessoa): Pessoa {
    this.getDataReceita(this.apenasNumeros(company.cpfOnCnpj)).subscribe(
      retorno => {
        if (retorno.status == 'OK') {
          ////console.log(retorno);
          let enderecoPrincipal: Endereco = {} as Endereco;
          company.capital_social = this.numberToReal(retorno.capital_social);
          company.data_situacao = retorno.data_situacao;
          company.natureza = retorno.natureza;
          company.natureza_juridica = retorno.natureza_juridica;
          company.code = retorno.atividade_principal[0].code;
          company.name = retorno.nome;
          company.atividade_principal = retorno.atividade_principal[0].text;
          company.enderecos = [] as Endereco[];
          company.enderecoPrincipal.bairro = retorno.bairro;
          company.enderecoPrincipal.city = retorno.municipio;
          company.enderecoPrincipal.state = retorno.uf;
          company.enderecoPrincipal.nro = retorno.numero;
          company.enderecoPrincipal.zipCode = retorno.cep;
          company.enderecoPrincipal.street = retorno.logradouro;
          company.enderecoPrincipal.complement = retorno.complemento;

          company.enderecoPrincipal.bairro = retorno.bairro;
          company.enderecoPrincipal.city = retorno.municipio;
          company.enderecoPrincipal.state = retorno.uf;
          company.enderecoPrincipal.nro = retorno.numero;
          company.enderecoPrincipal.zipCode = retorno.cep;
          company.enderecoPrincipal.street = retorno.logradouro;
          company.enderecoPrincipal.complement = retorno.complemento;
          company.enderecos.push(enderecoPrincipal);

          ;
          let msg = 'Consulta Realizado com Sucesso';
          let tipo = 'success'
          this.createNotification('Sucesso', 'Sucesso', msg);
        }
        else {
          this.createNotification('error', 'CNPJ inválido', "Ocorreu um erro durante a consulta, tente mais tarde!");
        }
      }
    )
    return company;
  }

  getDataReceita(cnpj: string): any {
    return this.http.jsonp<any>(`https://www.receitaws.com.br/v1/cnpj/` + cnpj, 'callback');
  }
  getEnderecoPorCep(company: Pessoa): Pessoa {
    console.log(company);
    let cep = company.enderecoPrincipal.zipCode;
    this.getDataCep(this.apenasNumeros(company.enderecoPrincipal.zipCode)).subscribe(
      dados => {
        //console.log((dados));
        if (!("erro" in dados)) {
          // Atualiza os campos com os valores
          // da consulta.
          //   company.enderecoPrincipal={} as Endereco;
          company.enderecoPrincipal.zipCode = cep;
          company.enderecoPrincipal.street = dados.logradouro;
          company.enderecoPrincipal.bairro = dados.bairro;
          company.enderecoPrincipal.city = dados.localidade;
          company.enderecoPrincipal.state = dados.uf;
          let msg = 'Consulta de enderço por CEP realizado com sucesso';
          let tipo = 'success'
          this.createNotification('Sucesso', 'Sucesso', msg);
        } // end if.
        else {
          // CEP pesquisado não foi
          // encontrado.
          this.createNotification('error', 'CEP inválido', "Endereço não localizado");
        }
      }
    )
    //console.log(company);
    return company;
  }
  getDataCep(cep: string): any {
    return this.http.get<any>("https://viacep.com.br/ws/" + cep + "/json/");
  }
  apenasNumeros(string: string) {
    //console.log(string);
    var numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  getEndereco(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  consultacep(cep): Endereco {
    let endereco: Endereco;
    let interval = setInterval(async () => {

      let cepjdigito = this.apenasNumeros(cep);
      await this.getEndereco(cepjdigito).subscribe(
        dados => {
          ////console.log((dados));
          if (!("erro" in dados)) {
            // Atualiza os campos com os valores
            // da consulta.
            endereco.street = dados.logradouro;
            endereco.bairro = dados.bairro;
            endereco.city = dados.localidade;
            endereco.state = dados.uf;
            let msg = 'Consulta de enderço por CEP realizado com sucesso';
            let tipo = 'success'
            this.createNotification('Sucesso', 'Sucesso', msg);
          } // end if.
          else {
            // CEP pesquisado não foi
            // encontrado.
            this.createNotification('error', 'CEP inválido', "Endereço não localizado");
          }
        }
      )
      clearInterval(interval);

    }, 1000);
    return endereco;
  }

}
