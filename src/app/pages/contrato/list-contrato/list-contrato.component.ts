import { Component, OnInit } from '@angular/core'; 
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { Contrato } from 'src/app/models/contrato'; 
import { ContratoService } from 'src/app/services/contrato.service'; 
import { BaseDto } from '../../../models/dto/base-dto';


@Component({
  selector: 'app-list-contrato',
  templateUrl: './list-contrato.component.html',
  styleUrls: ['./list-contrato.component.css']
})
export class ListContratoComponent implements OnInit {
 
  contratos:BaseDto[];
  listOfDisplaycontratos:BaseDto[]=[] as BaseDto[];

  searchValue = '';


  constructor(   
    private contratoService: ContratoService, 
  ) { }

  ngOnInit(): void { 
    
    console.log(  this.contratos);
   this.contratoService.getAll().subscribe(
      rest => { 
          console.log(rest);
          this.contratos = rest;
          this.listOfDisplaycontratos = rest;
        }  
    )
  }
  searchEntry$: Subject<string> = new Subject<string>();

  debounceTimeSearch() {
    this.searchEntry$.next(this.searchValue);
    this.searchEntry$
      .pipe(debounceTime(500))
      .subscribe((s) => {
        this.search();
      })
    
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void { 
    this.listOfDisplaycontratos  = this.contratos.filter((item: Contrato) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }
}
