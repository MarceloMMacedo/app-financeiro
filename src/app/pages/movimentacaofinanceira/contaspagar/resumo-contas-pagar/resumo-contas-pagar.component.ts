import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentoSaidaService } from '../../../../services/movimento-saida.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { Resumocontas } from 'src/app/models/report/resumocontas';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resumo-contas-pagar',
  templateUrl: './resumo-contas-pagar.component.html',
  styleUrls: ['./resumo-contas-pagar.component.css'],
  styles: [
    `tr:nth-child(even) {
      background-color: #ccc;
    }
    `
  ]
})
export class ResumoContasPagarComponent implements OnInit {

  resumoAnual: Resumocontas[];
  totalPagar: number = 0;
  jan: number = 0;
  fev: number = 0;
  mar: number = 0;
  abl: number = 0;
  mai: number = 0;
  jun: number = 0;
  jul: number = 0;
  ago: number = 0;
  set: number = 0;
  out: number = 0;
  nov: number = 0;
  dez: number = 0;

  ant: number = 0;
  atual: number = 0;
  pagar: number = 0;


  expandSet = new Set<number>();

  index: string;
  calendarOptions: CalendarOptions;
  date = new Date(2021, 1, 3);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
  constructor(
    private movimentoSaidaService: MovimentoSaidaService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.index = params['id']);
    this.movimentoSaidaService.getAll(this.index).subscribe(
      rest => {
        this.resumoAnual = rest;
        let total = this.resumoAnual.reduce((total, valor) => total + valor.total, 0);

        this.totalPagar = total;

        let atual = this.resumoAnual.reduce((atual, valor) => atual + valor.saldoExercioAtual, 0);
        this.atual = atual;

        let ant = this.resumoAnual.reduce((ant, valor) => ant + valor.saldoanterior, 0);
        this.ant = ant;

        let valor = this.resumoAnual.reduce((valor, obj) => valor + obj.jan, 0);
        this.jan = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.fev, 0);
        this.fev = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.mar, 0);
        this.mar = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.abl, 0);
        this.abl = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.mai, 0);
        this.mai = valor;


        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.jun, 0);
        this.jun = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.jul, 0);
        this.jul = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.ago, 0);
        this.ago = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.set, 0);
        this.set = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.out, 0);
        this.out = valor;

        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.nov, 0);
        this.nov = valor;


        valor = 0;
        valor = this.resumoAnual.reduce((valor, obj) => valor + obj.dez, 0);
        this.dez = valor;




      }
    )
    this.movimentoSaidaService.getEvents().subscribe(
      rest => setTimeout(() => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: rest,
          eventClick:  this.quitar.bind(this),
        };
      }, 100)
    )
  }
  quitar(id) {
    console.log(id.event.id + '-'+ this.index);
    this.router.navigate( ['quitarcontaspagar',   this.index ,  id.event.id   ]);
    //this.router.navigate(['quitarcontaspagar' ,  { queryParams: {exercicio:this.index , id: id.event.id} } ]);
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  contapagar(id){

    this.router.navigate( ['/contaspagar',   this.index ,  id ]);
  }
}
