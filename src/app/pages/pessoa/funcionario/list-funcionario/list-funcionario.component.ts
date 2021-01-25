import { Component, ElementRef, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';

import { Observable } from 'rxjs/internal/Observable';
import { Subject, Subscriber, observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { debounceTime, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { ViewChild } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { ContasBancaria } from 'src/app/models/contas-bancaria';

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.css'],
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `
  ]
})
export class ListFuncionarioComponent implements OnInit {
  searchValue = '';
  visible = false;
  pessoas: BaseDto[] = [] as BaseDto[];
  listOfDisplayFornedors = [] as BaseDto[];

  page = 1;
  pageSize = 8;
  collectionSize = 8;
  linesPerPage = 8;
  orderBy = '';
  direction = '';
  find: string = '';
  pessoa: Pessoa;
  
  dateFormat = 'dd/MM/yyyy';
  constructor(
    public storage: StorageService,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
   this.funcionarioService.getAll().subscribe(
     rest=>{
      this.listOfDisplayFornedors=rest;
      this.pessoas=rest;
     }

   )

  }

  searchEntry$: Subject<string> = new Subject<string>();

  debounceTimeSearch() {
    this.searchEntry$.next(this.searchValue);
    this.searchEntry$
      .pipe(debounceTime(700))
      .subscribe((s) => {
        console.log(s);
        this.search();
      })
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.spinner.show();
    setTimeout(() => {
      this.listOfDisplayFornedors = this.pessoas.filter((item: BaseDto) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
      this.spinner.hide();
    }, 200);
    }
  
  openLg(content) {
    this.pessoa = {} as Pessoa;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
        this.insert();
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

    insert() {
    

    console.log(this.pessoa);
    this.pessoa.status = "Ativo";
    let endr: Endereco = {} as Endereco;
    //this.pessoa.enderecoPrincipal=endr;
    this.pessoa.enderecos=[] as Endereco[];
    this.pessoa.enderecos.push(endr);

    this.pessoa.contasBancarias = [] as ContasBancaria[];

      this.funcionarioService.insert(this.pessoa).subscribe(
      (resp) => {
        this.router.navigate(['/funcionarios', resp.body]);
      }
    );


  }
}
