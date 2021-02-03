import { Component, OnInit } from '@angular/core'; 
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { Contato } from 'src/app/models/contato';
import { Contrato } from 'src/app/models/contrato'; 
import { DestinationEmail } from 'src/app/models/report/destination-email';
import { ContratoService } from 'src/app/services/contrato.service'; 
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { StorageService } from 'src/app/services/storage.service';
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

  destinatariemail: DestinationEmail;
  isVisible = false;
  visible= false;

 
  contacts: Contato[];
  constructor(   
    public storage: StorageService,
    private contratoService: ContratoService, 
    private funcionariosService: FuncionarioService, 
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
  printview() { 
    setTimeout(() => {



    this.contratoService.getview().subscribe(
      (response) => {
        console.log(response);
        const file = new Blob([response], { type: 'application/pdf' });

        console.log(file);
        const fileURL = URL.createObjectURL(file);

        console.log(fileURL);
        window.open(fileURL);
 
      });
    }, 1000);
  }
  
  sendmail(content) {  
    this.isVisible = false;
    console.log(content);
    this.contratoService.sendMail(content).subscribe();


  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  addcontato(contact: Contato) {
    this.funcionariosService.insertcontact(this.storage.getIdUser().id, contact).subscribe(
    )

  }
}
