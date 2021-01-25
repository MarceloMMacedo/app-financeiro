import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import * as $ from 'jquery';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoFinanceiro } from '../../../models/grupo-financeiro';
import { CentroCusto } from '../../../models/centro-custo';
import { CentroCustoService } from '../../../services/centro-custo.service'; 
import { CurrencyMaskInputMode } from 'ngx-currency';
import { AgregadoFinanceiro } from '../../../models/agregado-financeiro';
import { Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GrupoanuncioService } from '../../../services/grupoanuncio.service';
@Component({
  selector: 'app-edit-grupoanuncio',
  templateUrl: './edit-grupoanuncio.component.html',
  styleUrls: ['./edit-grupoanuncio.component.css']
})
export class EditGrupoanuncioComponent implements OnInit {


  historicoPadrao: GrupoFinanceiro;
  isVisible = false;
  isSpinning: boolean = false;
  agregadofinaneiro: AgregadoFinanceiro = {} as AgregadoFinanceiro;
  centrocustos: CentroCusto[] = [] as CentroCusto[];
  index: string;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  confirmModal?: NzModalRef; // For testing by now

  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  // dataClintecnp: DataClintecnpj;
  constructor(
    public storage: StorageService,
    public grupoanuncioService: GrupoanuncioService,
    public cepService: UtilsService,
    private utilService: UtilsService,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private centrocustoservice: CentroCustoService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef, 
  ) { }


  ngOnInit(): void {
    this.centrocustoservice.getAll().subscribe(
      rest => {
        this.centrocustos = rest;

      }
    );

    this.historicoPadrao = {} as GrupoFinanceiro;
    this.historicoPadrao.centrocusto = {} as CentroCusto;
    this.historicoPadrao.agregadofinanceiros = [] as AgregadoFinanceiro[];
    this.historicoPadrao.percentualComplamento = 100;
    this.historicoPadrao.percentualAgregados = 0;
    this.route.params.subscribe(params => this.index = params['id']);
    //////console.log(this.index);
    if (this.index != '0') {
      setTimeout(() => {
        this.grupoanuncioService.findById(this.index).subscribe(
          rest => {

            this.historicoPadrao = rest;
            if (this.historicoPadrao.centrocusto == null)
              this.historicoPadrao.centrocusto = {} as CentroCusto;
          }

        )
      }, 100);
    }
  }
  deleteagregado(id, indice) {
    //console.log(id);
    this.modal.confirm({
      nzTitle: 'Deseja Excluir Agregado?',
      nzContent: '<b style="color: red;">Após exclusão o agreagado será removido',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        if (id != null) {
          setTimeout(() => {
            this.grupoanuncioService.deleteAgregado(id);
          }, 100);
          setTimeout(() => {
            this.grupoanuncioService.findById(this.index).subscribe(
              rest => {
                this.historicoPadrao = rest;
              }
            )

            this.historicoPadrao.agregadofinanceiros.splice(indice, 1);
            let total = this.historicoPadrao.agregadofinanceiros.reduce((total, valor) => total + valor.percentual, 0);
            this.historicoPadrao.percentualAgregados = total;
            this.historicoPadrao.percentualComplamento = 100 - total;
          }, 100);
        } else {
          this.historicoPadrao.agregadofinanceiros.splice(indice, 1);
          let total = this.historicoPadrao.agregadofinanceiros.reduce((total, valor) => total + valor.percentual, 0);
          this.historicoPadrao.percentualAgregados = total;
          this.historicoPadrao.percentualComplamento = 100 - total;
        }
      },
      nzCancelText: 'Não'
    });
  }
  save() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();

      if (this.index != '0') {
        this.grupoanuncioService.save(this.historicoPadrao);
        setTimeout(() => {
          this.grupoanuncioService.findById(this.index).subscribe(
            rest => {
              this.historicoPadrao = rest;
            }

          )
        }, 100);
      } else {
        //////console.log(this.historicoPadrao);
        this.grupoanuncioService.insert(this.historicoPadrao).subscribe(
          (resp) => {
            this.index = resp.body;
            this.historicoPadrao.id = parseFloat(this.index);
            this.router.navigate(['/grupoanuncio', resp.body]);
          }
        );
        setTimeout(() => {
          this.grupoanuncioService.findById(this.index).subscribe(
            rest => {

              this.historicoPadrao = rest;
              if (this.historicoPadrao.centrocusto == null)
                this.historicoPadrao.centrocusto = {} as CentroCusto;
            }

          )
        }, 100);

      }
    }, 100);

  } 
  showEdit(a: AgregadoFinanceiro) {
    this.agregadofinaneiro = {} as AgregadoFinanceiro; 
    this.agregadofinaneiro = a;    
    this.isVisible = true;
  }
  showModal(): void {
    this.agregadofinaneiro = {} as AgregadoFinanceiro;

    this.agregadofinaneiro.centrocusto = {} as CentroCusto;

    this.agregadofinaneiro.id=0;
    this.agregadofinaneiro.percentual = 0;

    this.isVisible = true;
  }
  handleGrupoAdd() {
    if (this.agregadofinaneiro.centrocusto.id == null) {
      this.modal.error({
        nzTitle: 'Selecione Centro de Custo', 
      });
    } else {
      //console.log( this.agregadofinaneiro.id);
      if (this.agregadofinaneiro.id == 0){
        this.historicoPadrao.agregadofinanceiros.push(this.agregadofinaneiro);
        this.agregadofinaneiro.id =null;
      }
       
      let total = this.historicoPadrao.agregadofinanceiros.reduce((total, valor) => total + valor.percentual, 0);
      this.historicoPadrao.percentualAgregados = total;
      this.historicoPadrao.percentualComplamento = 100 - total;
      this.isVisible = false;
    }
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
 
  }
 
