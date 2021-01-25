import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResumoMovimentoFinaneiro } from 'src/app/models/report/resumo-movimento-finaneiro';
import { ReporMovimentoFinanceiroService } from 'src/app/services/repor-movimento-financeiro.service';
import { MovimentoSaidaService } from '../../../services/movimento-saida.service';

@Component({
  selector: 'app-contas-pagar-receber',
  templateUrl: './contas-pagar-receber.component.html',
  styleUrls: ['./contas-pagar-receber.component.css']
})
export class ContasPagarReceberComponent implements OnInit {

  calendarOptions: CalendarOptions;
  resumo:ResumoMovimentoFinaneiro;
  totalPagar:number=0;
  totalContrato:number=0;
  totalServicos:number=0;

  constructor(
    private reporMovimentoFinanceiroService: ReporMovimentoFinanceiroService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.resumo={} as ResumoMovimentoFinaneiro;

    this.spinner.show();
    setTimeout(() => {
    this.reporMovimentoFinanceiroService.getAll().subscribe(
      rest=>{
        this.resumo=rest;
        let total = this.resumo.resumoPagar.reduce((total, valor) => total + valor.total, 0);
        let total1 = this.resumo.resumoReceberContrato.reduce((total1, valor) => total1 + valor.total, 0);
        let total2 = this.resumo.resumoReceberServico.reduce((total2, valor) => total2 + valor.total, 0);
        this.totalContrato=total1;
        this.totalServicos=total2;
        this.totalPagar=total;
        console.log( rest.events);
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: rest.events ,
          eventClick: function (arg) {
            alert(arg.event.title)
            alert(arg.event.id)
          },
        };

      }
    )

    this.spinner.hide();
  },200)
  }
  printview() {
    this.spinner.show();
    setTimeout(() => {
    this.reporMovimentoFinanceiroService.getview().subscribe(
      (response) => {
        console.log(response);
        const file = new Blob([response], { type: 'application/pdf' });

        console.log(file);
        const fileURL = URL.createObjectURL(file);

        console.log(fileURL);
        window.open(fileURL);


      });
      this.spinner.hide();
    }, 1000);
  }
}
