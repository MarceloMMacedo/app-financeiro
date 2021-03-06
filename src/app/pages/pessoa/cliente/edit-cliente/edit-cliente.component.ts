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
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Contato } from 'src/app/models/contato';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  editCache: { [key: string]: { edit: boolean; data: Endereco } } = {};

  company: Pessoa;
  isVisible = false;
  isSpinning: boolean = false;
  contact: Contato = {} as Contato;
 
  index;
  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private pessoaService: ClienteService,
    public cepService: UtilsService,
    public storage: StorageService,
    private utilService: UtilsService,
    private modal: NzModalService
  ) {}

    ngOnInit(): void {
      //this.spinner.show();
      this.company = {} as Pessoa;
      this.company.enderecoPrincipal = {} as Endereco;
      this.company.contatoPrincipal = {} as Contato;
  
      this.spinner.show();
      this.route.params.subscribe(params => this.index = params['id']);
      ////console.log(this.index);
      if (this.index != '0') {
        setTimeout(() => {
          this.pessoaService.findById(this.index).subscribe(
            rest => {
             
              this.company = rest;
              if (this.company.enderecoPrincipal == null)
                this.company.enderecoPrincipal = {} as Endereco;
  
              if (this.company.contatoPrincipal == null)
                this.company.contatoPrincipal = {} as Contato;            ////console.log(this.company);
            }
  
          )
        }, 100);
      }
  
      this.spinner.hide();
    }
  
    //load imagem
    onClickImagePrincipal() {
      $('#imgupload').trigger('click');
    }
    getFileExtension2(filename) {
      return filename.split('.').pop();
    }
    async onUploadMainImage(event) {
      this.modal.confirm({
        nzTitle: 'Deseja Alterar Avatar da Cliente?',
        nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
        nzOkText: 'Sim',
        nzOkType: 'danger',
        nzOnOk: () => {
          if (this.index == '0') this.save;
          this.company= this.pessoaService.uploadPicture(this.company, event, "empresa");
           
        },
        nzCancelText: 'Não'
      });
  
  
    }
    async save() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
  
        if (this.index != '0') {
          console.log(this.company);
          this.pessoaService.save(this.company);
        } else {
          ////console.log(this.company);
          this.pessoaService.insert(this.company).subscribe(
            (resp) => {
              this.index = resp.body;
              this.company.id = parseFloat(this.index);
              this.router.navigate(['/clientes', resp.body]);
            }
          );
        }
      }, 100);
  
    }
  
    consultacep() {
      this.spinner.show();
      let zipCode = this.company.zipCode;
      this.company =
        this.utilService.getEnderecoPorCep(this.company);
      this.spinner.hide();
    }
  
    async getEndereco() {
      this.spinner.show();
      this.company = this.utilService.getDataPessoaCNPJ(this.company);
      this.spinner.hide();
    }
  
    edit(i: Contato) {
      this.contact = {} as Contato;
      this.contact = i;
      this.isVisible = true;
  
    }
    delete(j) {
  
      this.modal.confirm({
        nzTitle: 'Deseja Excluir Contato?',
        nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
        nzOkText: 'Sim',
        nzOkType: 'danger',
        nzOnOk: () => {
  
          ////console.log(this.company.contatos[j]);
          this.company.contatos.splice(j, 1);
        },
        nzCancelText: 'Não'
      });
  
    }
    addContact() {
      let contact = {} as Contato;
      contact.name = 'novo contato';
      this.company.contatos.push(contact);
      ////console.log(this.company.contatos);
    }
  
  }
  