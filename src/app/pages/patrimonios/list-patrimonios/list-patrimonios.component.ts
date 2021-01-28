import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/services/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patrimonio } from 'src/app/models/patrimonio';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { BaseDto } from 'src/app/models/dto/base-dto';  

@Component({
  selector: 'app-list-patrimonios',
  templateUrl: './list-patrimonios.component.html',
  styleUrls: ['./list-patrimonios.component.css'],
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
export class ListPatrimoniosComponent implements OnInit {


  patrimonios: BaseDto[];
  patrimonio: Patrimonio;
  searchValue = '';
  visible = false;
  listOfDisplayPatrimonios = [] as BaseDto[];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private patrimoniosService: PatrimoniosService,
    private utilService: UtilsService,
    public storage: StorageService,
    private modeloService: ModeloService,) { }


  ngOnInit(): void {
    this.patrimonio = {} as Patrimonio;
    this.patrimonio.modelo = {} as Modelo;
    this.patrimoniosService.getAll().subscribe(
      rest => {
        this.patrimonios = rest;
        this.listOfDisplayPatrimonios = rest;
      }
    )

  }

  newpatrimonio(content) {
    this.patrimonio = {} as Patrimonio;
    this.patrimonio.name='novo patrimonio';
    this.patrimonio.status='Ativo';
    this.patrimonio.statuslocacao='Ativo';
    this.patrimonio.modelo = {} as Modelo;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.patrimoniosService.savenew(this.patrimonio).subscribe(
          rest => {
            this.router.navigate(['/patrimonios', rest.body]);
          }
        )
      }, (reason) => {
      });
 
  }

  searchEntry$: Subject<string> = new Subject<string>();

  debounceTimeSearch() {
    this.searchEntry$.next(this.searchValue);
    this.searchEntry$
      .pipe(debounceTime(700))
      .subscribe((s) => {  
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
      this.listOfDisplayPatrimonios = this.patrimonios.filter((item: BaseDto) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
      this.spinner.hide();
    }, 200);
    }
    pdf(){
      
    }


    sendmail(content) {
      this.patrimonio = {} as Patrimonio;
      this.patrimonio.name='novo patrimonio';
      this.patrimonio.status='Ativo';
      this.patrimonio.statuslocacao='Ativo';
      this.patrimonio.modelo = {} as Modelo;
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.patrimoniosService.savenew(this.patrimonio).subscribe(
            rest => {
              this.router.navigate(['/patrimonios', rest.body]);
            }
          )
        }, (reason) => {
        });
   
    }
  

}

