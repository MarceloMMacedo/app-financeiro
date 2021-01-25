import { Component, OnInit } from '@angular/core';
import { BaseDto } from '../../../models/dto/base-dto';
import { EmpresaService } from '../../../services/empresa.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-list-empresas',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css'],
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
export class ListEmpresasComponent implements OnInit {

  searchValue = '';
  visible = false;
  pessoas: BaseDto[] = [] as BaseDto[];
  listOfDisplayPessoas = [] as BaseDto[];
  constructor(
    private empresaSrvice: CompanyService,
  ) { }

  ngOnInit(): void {
    this.empresaSrvice.getAll().subscribe(
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
    this.listOfDisplayPessoas = this.pessoas.filter((item: BaseDto) => item.name.indexOf(this.searchValue) !== -1);
  }

}
