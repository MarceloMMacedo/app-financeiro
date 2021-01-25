import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service'; 
import * as $ from 'jquery';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';  
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoFinanceiro } from '../../../models/grupo-financeiro';
import { HistoricopadraosaidaService } from '../../../services/historicopadraosaida.service';
import { CentroCusto } from '../../../models/centro-custo';
import { CentroCustoService } from '../../../services/centro-custo.service';

@Component({
  selector: 'app-edit-historicosaidapadrao',
  templateUrl: './edit-historicosaidapadrao.component.html',
  styleUrls: ['./edit-historicosaidapadrao.component.css']
})
export class EditHistoricosaidapadraoComponent implements OnInit {

 
  historicoPadrao: GrupoFinanceiro;
  isVisible = false;
  isSpinning: boolean = false; 

  centrocustos: CentroCusto[];
  index: string;
  // dataClintecnp: DataClintecnpj;
  constructor(
    public storage: StorageService,
    public historicopadraosaidaService: HistoricopadraosaidaService,
    public cepService: UtilsService,
    private utilService: UtilsService,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private centrocustoservice: CentroCustoService,
    private router: Router,
    private modal: NzModalService
  ) { }


  ngOnInit(): void {
    this.centrocustoservice.getAll().subscribe(
      rest => {
        console.log(rest);
        this.centrocustos = rest;
      }
    );
    
    this.historicoPadrao = {} as GrupoFinanceiro;
    this.historicoPadrao.centrocusto = {} as CentroCusto;
  this.route.params.subscribe(params => this.index = params['id']);
    ////console.log(this.index);
    if (this.index != '0') {
      setTimeout(() => {
        this.historicopadraosaidaService.findById(this.index).subscribe(
          rest => {
           
            this.historicoPadrao = rest;
            if (this.historicoPadrao.centrocusto == null)
              this.historicoPadrao.centrocusto = {} as CentroCusto;
          ////console.log(this.historicoPadrao);
          }

        )
      }, 100);
    }
  }
  save() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();

      if (this.index != '0') {
        console.log(this.historicoPadrao);
        this.historicopadraosaidaService.save(this.historicoPadrao);
      } else {
        ////console.log(this.historicoPadrao);
        this.historicopadraosaidaService.insert(this.historicoPadrao).subscribe(
          (resp) => {
            this.index = resp.body;
            this.historicoPadrao.id = parseFloat(this.index);
            this.router.navigate(['/historicosaida', resp.body]);
          }
        );
      }
    }, 100);

  }

}
