import { Component, Input, OnInit } from '@angular/core';
import { AgregadoFinanceiro } from '../../../models/agregado-financeiro';
import { CentroCusto } from '../../../models/centro-custo';
import { CentroCustoService } from '../../../services/centro-custo.service';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-edit-agregado-servico',
  templateUrl: './edit-agregado-servico.component.html',
  styleUrls: ['./edit-agregado-servico.component.css']
})
export class EditAgregadoServicoComponent implements OnInit {
  @Input() agregadofinaneiro: AgregadoFinanceiro;

  centrocustos: CentroCusto[] = [] as CentroCusto[];

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
    private centrocustoservice: CentroCustoService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.centrocustoservice.getAll().subscribe(
      rest => {
        this.centrocustos = rest;

      }
    );
  }

}
