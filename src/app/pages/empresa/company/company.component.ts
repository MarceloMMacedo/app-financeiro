import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { CompanyService } from 'src/app/services/company.service';
import * as $ from 'jquery';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Endereco } from 'src/app/models/endereco';
import { Pessoa } from 'src/app/models/pessoa';
import { Contato } from 'src/app/models/contato';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']

})
export class CompanyComponent implements OnInit {

  editCache: { [key: string]: { edit: boolean; data: Endereco } } = {};

  company: Pessoa;
  isVisible = false;
  isSpinning: boolean = false;
  contact: Contato = {} as Contato;

  index: string;
  // dataClintecnp: DataClintecnpj;
  constructor(
    public storage: StorageService,
    public companyService: CompanyService,
    public cepService: UtilsService,
    private utilService: UtilsService,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService
  ) { }

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
        this.companyService.findById(this.index).subscribe(
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
      nzTitle: 'Deseja Alterar Avatar da Empresa?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        if (this.index == '0') this.save;
        this.companyService.uploadPicture(this.company, event, "empresa");
        setTimeout(() => {
          this.companyService.findById(this.index).subscribe(
            rest =>
              this.company = rest
          )
        }, 100);
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
        this.companyService.save(this.company);
      } else {
        ////console.log(this.company);
        this.companyService.insert(this.company).subscribe(
          (resp) => {
            this.index = resp.body;
            this.company.id = parseFloat(this.index);
            this.router.navigate(['/empresa', resp.body]);
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
