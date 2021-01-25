import { Component, ElementRef, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';

import { Observable } from 'rxjs/internal/Observable';
import { Subject, Subscriber, observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { ViewChild } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { ContasBancaria } from 'src/app/models/contas-bancaria';
import { ClienteService } from 'src/app/services/cliente.service';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
   
  searchValue = '';
  visible = false;
  pessoas: BaseDto[] = [] as BaseDto[];
  listOfDisplayPessoas = [] as BaseDto[];
  constructor(
    public storage: StorageService,
    private router: Router,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    
  }
  ngOnInit(): void {
    this.clienteService.getAll().subscribe(
      rest => {
        setTimeout(() => {
           this.pessoas = rest;
           console.log(rest);
           this.listOfDisplayPessoas=rest;}
          , 100);
      }
    )
   // this.listOfDisplayPessoas = [...this.pessoas];
  }



  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayPessoas = this.pessoas.filter((item: BaseDto) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
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
}
