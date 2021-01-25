import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pessoa } from 'src/app/models/pessoa';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import * as $ from 'jquery';
import { UtilsService } from 'src/app/services/utils.service';
import { Endereco } from 'src/app/models/endereco';

import { CurrencyMaskInputMode } from 'ngx-currency';
import { Observable, observable } from 'rxjs';
import { ContasBancaria } from 'src/app/models/contas-bancaria'; 
@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {
  monthNames = [{ value: "janeiro" }, { value: "fevereiro" }, { value: "março" }, { value: "abril" }, { value: "maio" }, { value: "junho" }, { value: "julho" }, { value: "agosto" }, { value: "setembro" }, { value: "outubro" }, { value: "novembro" }, { value: "dezembro" }];
  funcionario: Pessoa;
  index;
  dateFormat = 'dd/MM/yyyy';
  funcoes: Observable<string[]>;
  rules: Observable<string[]>;
  contasBancaria: ContasBancaria = {} as ContasBancaria;
  novocontato: boolean = false;
  isVisiblecontato: boolean = false;

  novobanco: boolean = false;
  isVisiblebanco: boolean = false;
  
  

  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  constructor(   
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService,
    private modal: NzModalService,
    private utilService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {

      this.spinner.hide();
    }, 1000);

    this.route.params.subscribe(params => this.index = params['id']);

    this.rules = this.funcionarioService.getrules();
    this.funcoes = this.funcionarioService.getfuncoes();
    this.funcionarioService.findById(this.index).subscribe(
      res => {
        this.funcionario = res
          ; console.log(res);
      }
    )
  }
  onClickImagePrincipal() {
    $('#imgupload').trigger('click');
  }
  async onUploadMainImage(event) {

    this.modal.confirm({
      nzTitle: 'Deseja Alterar Avatar do funcionario?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
      this.funcionario=  this.funcionarioService.uploadPicture(this.funcionario, event, "funcionario");
      },
      nzCancelText: 'Não'
    });

  }
  consultacepprincipal() {
     this.spinner.show();
     let zipCode = this.funcionario.enderecoPrincipal.zipCode;
   this.funcionario = this.utilService.getEnderecoPorCep(this.funcionario);

    this.spinner.hide();
  }
  salvar() {

    console.log(this.funcionario);
    this.funcionarioService.save(this.funcionario);
  }
  //banco
  editBanco(a: ContasBancaria) {
    this.contasBancaria = a;
    this.isVisiblebanco = true
  }
  novoBanco() {
    console.log(this.funcionario)
    this.contasBancaria = {} as ContasBancaria;
    this.novobanco = true;
    this.isVisiblebanco = true;

  }
  salvarBanco() {
    if (this.novobanco) {
      try {
        this.funcionario.contasBancarias.push(this.contasBancaria);
      } catch {
        this.funcionario.contasBancarias = [] as ContasBancaria[];
        this.funcionario.contasBancarias.push(this.contasBancaria);
      }
      this.novobanco = false;
      this.isVisiblebanco = false;
    }
  }
  deletebanco(i) {
    this.modal.confirm({
      nzTitle: 'Deseja Excluir Banco funcionario?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.funcionario.contasBancarias.splice(i, 1);
      },
      nzCancelText: 'Não'
    });
  }
}
