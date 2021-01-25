import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrato } from 'src/app/models/contrato';
import { Endereco } from 'src/app/models/endereco';
import { Pessoa } from 'src/app/models/pessoa';
import { CompanyService } from 'src/app/services/company.service';
import { StorageService } from 'src/app/services/storage.service';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-prin-contrato',
    templateUrl: './prin-contrato.component.html',
    styleUrls: ['./prin-contrato.component.css'],
    styles: [
        ` .book {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: #FAFAFA;
      font: 10pt "Tahoma";
  }
  * {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
  }
  .page {
      width: 210mm;
      
      height: 100%;
      min-height: 297mm;
      padding: 0mm;
      margin: 1mm auto;
      border: 0px #D3D3D3 solid;
      border-radius: 0px;
      background: white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  .subpage {
      padding: 1mm;
      padding-bottom:2cm;
      padding-top:2cm;
      border: 0px red solid;
     
      outline: 0cm #FFEAEA solid;
  }
  
  @page {
      size: A4;
      margin: 0;
  }
  @media print { 
    size: A4;
    footer {
    position: fixed;
    bottom: 0;
        }
      html, book {
          width: 210mm;
          height: 297mm;        
            }
      .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
            }
        }
        .content-block, p {
    page-break-inside: avoid;
  }
  footer {
  font-size: 9px;
  color: #f00;
  text-align: center;
}
        `
    ]
})
export class PrinContratoComponent implements OnInit {

    @Input() contratoServico: Contrato;
    cliente: Pessoa;
    @Input()   empresa: Pessoa;
    dataforum;
    valor;
    periodo;
    constructor(
        public storage: StorageService,
        private clienteservice: ClienteService,
        private router: Router,
        private empresaService: CompanyService) {
        this.empresa = {} as Pessoa;
        this.contratoServico = {} as Contrato;
        this.contratoServico.cliente = {} as Pessoa;
    }


    ngOnInit(): void {
        this.empresaService.findById(this.storage.getLocalUser().idCompany).subscribe(
            (resp) => {
                this.empresa = resp;

            }
        )
        //  const numero = require('numero-por-extenso');
        this.periodo;// = numero.porExtenso(this.contratoServico.periodo);
        let data = new Date();

        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        // Dias possíveis
        var diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        // Partes da data informada
        var dia = data.getDate();
        var dias = data.getDay();
        var mes = data.getMonth();
        var ano = data.valueOf;

        this.clienteservice.findById(this.contratoServico.cliente.id).subscribe(
            rest => this.cliente = rest
        )

        this.dataforum = new Date();// dia + ' de ' + meses[mes] + ' de ' + ano;


    }

}
