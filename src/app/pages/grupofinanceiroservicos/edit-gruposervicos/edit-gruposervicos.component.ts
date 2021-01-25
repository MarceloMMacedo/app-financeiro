import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoFinanceiro } from '../../../models/grupo-financeiro';
import { CentroCusto } from '../../../models/centro-custo';
import { CentroCustoService } from '../../../services/centro-custo.service';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { AgregadoFinanceiro } from '../../../models/agregado-financeiro';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GruposervicosService } from 'src/app/services/gruposervicos.service';
@Component({
  selector: 'app-edit-gruposervicos',
  templateUrl: './edit-gruposervicos.component.html',
  styleUrls: ['./edit-gruposervicos.component.css']
})
export class EditGruposervicosComponent implements OnInit {

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
    public gruposervicoService: GruposervicosService,
    public cepService: UtilsService,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private centrocustoservice: CentroCustoService,
    private router: Router,
    private modal: NzModalService,
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
        this.gruposervicoService.findById(this.index).subscribe(
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
            this.gruposervicoService.deleteAgregado(id);
          }, 100);
          setTimeout(() => {
            this.gruposervicoService.findById(this.index).subscribe(
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
        this.gruposervicoService.save(this.historicoPadrao);
        setTimeout(() => {
          this.gruposervicoService.findById(this.index).subscribe(
            rest => {
              this.historicoPadrao = rest;
            }

          )
        }, 100);
      } else {
        //////console.log(this.historicoPadrao);
        this.gruposervicoService.insert(this.historicoPadrao).subscribe(
          (resp) => {
            this.index = resp.body;
            this.historicoPadrao.id = parseFloat(this.index);
            this.router.navigate(['/gruposervico', resp.body]);
          }
        );


      }
      setTimeout(() => {
        this.gruposervicoService.findById(this.index).subscribe(
          rest => {

            this.historicoPadrao = rest;
            if (this.historicoPadrao.centrocusto == null)
              this.historicoPadrao.centrocusto = {} as CentroCusto;
          }

        )
      }, 10);
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


