import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { ContasPagarSaida } from 'src/app/models/dto/contas-pagar-saida';
import { GrupoFinanceiro } from 'src/app/models/grupo-financeiro';
import { MovimentoFinanceiro } from 'src/app/models/movimento-financeiro';
import { HistoricopadraosaidaService } from 'src/app/services/historicopadraosaida.service';
import { MovimentoSaidaService } from 'src/app/services/movimento-saida.service';

@Component({
  selector: 'app-new-conta-pagar',
  templateUrl: './new-conta-pagar.component.html',
  styleUrls: ['./new-conta-pagar.component.css']
})
export class NewContaPagarComponent implements OnInit {
historicoSaida:GrupoFinanceiro[];
contasPagarSaida:MovimentoFinanceiro;

dateFormat = 'dd/MM/yyyy';
customMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};
customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


  constructor(
    private historicoSaidaService:HistoricopadraosaidaService,
    private movimentoSaidaService:MovimentoSaidaService,
    private modal: NzModalService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.contasPagarSaida={} as MovimentoFinanceiro;
    this.contasPagarSaida.dataVencimento=new Date();
    this.contasPagarSaida.parcela=1;
    this.contasPagarSaida.valor=0;
    this.contasPagarSaida.name="nova conta pagar ";
    this.contasPagarSaida.historico={} as GrupoFinanceiro;
    this.historicoSaidaService.getAll().subscribe(
      rest=>this.historicoSaida=rest
    )
  }
oncreate(){
  this.modal.confirm({
    nzTitle: 'Deseja Incluir Nova Conta Pagar?',
    nzContent: '<b style="color: red;">Uma nova Conta a Pagar será criada </b>',
    nzOkText: 'Sim',
    nzOkType: 'danger',
    nzOnOk: () => {
      let data=new Date();
      let ano= new Date().getFullYear();
      console.log( new Date().getFullYear());
      setTimeout(() => {
          this.movimentoSaidaService.oncreate(this.contasPagarSaida).subscribe(
            resp => {

              setTimeout(() => {
                this.router.navigate(['/contaspagar', ano ,   resp.body]);

                   }, 1000);


            }
          );


      }, 10);

    },
    nzCancelText: 'Não'
  });
}
}
