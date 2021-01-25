import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { GrupoFinanceiro } from 'src/app/models/grupo-financeiro';
import { CentroCusto } from '../../../models/centro-custo';
import { StorageService } from '../../../services/storage.service';
import { CentroCustoService } from '../../../services/centro-custo.service';
import { GruposervicosService } from 'src/app/services/gruposervicos.service';
@Component({
  selector: 'app-list-gruposervicos',
  templateUrl: './list-gruposervicos.component.html',
  styleUrls: ['./list-gruposervicos.component.css']
})
export class ListGruposervicosComponent implements OnInit {

  searchValue = '';
  visible = false;
  centrocustos: CentroCusto[];
  historicoPadrao: GrupoFinanceiro;
  historicoPadraos: GrupoFinanceiro[] = [] as GrupoFinanceiro[];
  listOfDisplayhistoricoPadrao = [] as GrupoFinanceiro[];
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
    public storage: StorageService,
    private router: Router,
    private historicopadraoService: GruposervicosService,
    private spinner: NgxSpinnerService,
    private centrocustoservice: CentroCustoService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {

    this.historicoPadrao = {} as GrupoFinanceiro;
    this.historicoPadrao.centrocusto = {} as CentroCusto;
    this.historicopadraoService.getAll().subscribe(
      rest => {
        setTimeout(() => {
          this.historicoPadraos = rest;
          this.listOfDisplayhistoricoPadrao = rest;
        }
          , 100);
      }
    )
    this.centrocustoservice.getAll().subscribe(
      rest => {
        //console.log(rest);
        this.centrocustos = rest;
      }
    );
  }


  searchEntry$: Subject<string> = new Subject<string>();

  debounceTimeSearch() {
    this.searchEntry$.next(this.searchValue);
    this.searchEntry$
      .pipe(debounceTime(700))
      .subscribe((s) => {
        //console.log(s);
        this.search();
      })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayhistoricoPadrao = this.historicoPadraos.filter((item: GrupoFinanceiro) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }
  deleteagregado(){

  }
  newhistoricoPadrao(content) {
    this.historicoPadrao = {} as GrupoFinanceiro;
    this.historicoPadrao.centrocusto = {} as CentroCusto;


    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        ////console.log(`Closed with: ${result}`);
        this.savenew();
      }, (reason) => {
        ////console.log(`Dismissed ${reason}`);
      });

  }
  savenew() {
    this.historicopadraoService.insert(this.historicoPadrao).subscribe(
      rest => {

        this.historicoPadrao.id = parseFloat(rest.body);
        this.historicoPadraos.push(this.historicoPadrao);
        this.search();
      }
    );

  }

  edithistoricoPadrao(b: GrupoFinanceiro, content) {
    this.historicoPadrao = b;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.save();
      }, (reason) => {
      });

  }
  async save() {
    this.historicopadraoService.save(this.historicoPadrao);

  }
}
