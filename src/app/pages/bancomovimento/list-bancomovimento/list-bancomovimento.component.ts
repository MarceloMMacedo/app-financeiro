import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Observable } from 'rxjs';
import { ContasBancaria } from 'src/app/models/contas-bancaria';
import { BancomovimentoService } from 'src/app/services/bancomovimento.service';

@Component({
  selector: 'app-list-bancomovimento',
  templateUrl: './list-bancomovimento.component.html',
  styleUrls: ['./list-bancomovimento.component.css']
})
export class ListBancomovimentoComponent implements OnInit {

  bancos$: ContasBancaria[] ;
  banco: ContasBancaria;
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
    private bancomovimentoService: BancomovimentoService,
    private modalService: NgbModal
  ) { 
    this.banco={ } as ContasBancaria;
  }

  ngOnInit(): void {
     this.bancomovimentoService.getAll().subscribe(
       rest=>this.bancos$=rest
     );
  }

  newbanco(content) {
    this.banco = {} as ContasBancaria;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        //console.log(`Closed with: ${result}`);
        this.savenew();
      }, (reason) => {
        //console.log(`Dismissed ${reason}`);
      });

  }
   savenew() {
    this.bancomovimentoService.insert(this.banco).subscribe(
  );
    this.bancos$.push(this.banco);
  }

  editbanco(b:ContasBancaria,content) {
    this.banco = b;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.save();
      }, (reason) => {
      });

  }
  async save() {
    this.bancomovimentoService.save(this.banco) ;
     
  }
}
