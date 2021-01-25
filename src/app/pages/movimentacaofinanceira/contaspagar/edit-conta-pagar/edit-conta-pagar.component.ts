import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flattenTreeData } from 'ng-zorro-antd/core/tree';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContasBancaria } from 'src/app/models/contas-bancaria';
import { ContasPagarSaida } from 'src/app/models/dto/contas-pagar-saida';
import { FaturaDto } from 'src/app/models/dto/fatura-dto';
import { MovimentoFinanceiro } from 'src/app/models/movimento-financeiro';
import { BancomovimentoService } from 'src/app/services/bancomovimento.service';
import { MovimentoSaidaService } from 'src/app/services/movimento-saida.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-edit-conta-pagar',
  templateUrl: './edit-conta-pagar.component.html',
  styleUrls: ['./edit-conta-pagar.component.css']
})
export class EditContaPagarComponent implements OnInit {
  index;
  exercicio;

  contasPagarSaida:ContasPagarSaida;
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
  constructor(  private spinner: NgxSpinnerService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private movimentoSaidaService: MovimentoSaidaService,
    private utilService: UtilsService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.index = params['id']);
    this.route.params.subscribe(params => this.exercicio = params['exercicio']);
    this.movimentoSaidaService.editarMoviemnto(this.index).subscribe(
      rst=>this.contasPagarSaida=rst
    )
  }

  voltar(){
    this.router.navigate(['resumocontaspagar',this.exercicio]);
  }
  contapagar(id){

    this.router.navigate( ['/quitarcontaspagar',  this.exercicio,  id ]);
  }
}
