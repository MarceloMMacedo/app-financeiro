import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pessoa } from 'src/app/models/pessoa';
import { DemosntrativoFinanceiroDto } from 'src/app/models/report/demosntrativo-financeiro-dto';
import { ItemDemosntrativoFinanceiroDto } from 'src/app/models/report/item-demosntrativo-financeiro-dto';
import { ReportDemostrativoFinancerio } from 'src/app/models/report/report-demostrativo-financerio';
import { CompanyService } from 'src/app/services/company.service';
import { ReporMovimentoFinanceiroService } from 'src/app/services/repor-movimento-financeiro.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-demonstrativo-atual',
  templateUrl: './demonstrativo-atual.component.html',
  styleUrls: ['./demonstrativo-atual.component.css'],
  styles: [
    `
    .book {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: #FAFAFA;
      font: 10pt "Tahoma";
  }
  * {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
  }
  .page {
      width: 210mm;

      height: 100%;
      min-height: 297mm;
      padding: 0mm;
      margin: 1mm auto;
      border: 0px #D3D3D3 solid;
      border-radius: 0px;
      background: white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  .subpage {
      padding: 1mm;
      padding-bottom:2cm;
      padding-top:2cm;
      border: 0px red solid;

      outline: 0cm #FFEAEA solid;
  }

  @page {
      size: A4;
      margin: 0;
  }
    .appprincontrato {
      /* hide the printing component from @media screen  */
      display: none;
   }

   @media print {
      /* invert the display (show/hide) properties of the main */
      /* aplication component and the printing component       */
      .appprincontrato{
          display: block;
      }
       .pagina{
          display: none;
      }
      size: A4;
    footer {
    position: fixed;
    bottom: 0;
        }
      html, book {
          width: 210mm;
          height: 297mm;
            }
      .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
            }
   }
    `

  ]
})
export class DemonstrativoAtualComponent implements OnInit {
  demostrativoFinancerio: ReportDemostrativoFinancerio[];
  empresa: Pessoa;
  exercicio;
  mes;
  demosntrativoFinanceiroDto: DemosntrativoFinanceiroDto;
  dateFormat = 'dd/MM/yyyy';
  datainicio:Date;
  datafim:Date;
  constructor(
    private movimentoFinanceiroService: ReporMovimentoFinanceiroService,
    private empresaService: CompanyService,
    public storage: StorageService,
    private spinner: NgxSpinnerService,
  ) {
    this.datainicio=new Date();
    this.datafim=new Date();
   }

  async ngOnInit(): Promise<void> {
    this.demosntrativoFinanceiroDto = {} as DemosntrativoFinanceiroDto;
    this.demosntrativoFinanceiroDto.entradarealizados = [] as ItemDemosntrativoFinanceiroDto[];
    this.demosntrativoFinanceiroDto.saidarealizados = [] as ItemDemosntrativoFinanceiroDto[];
    this.demosntrativoFinanceiroDto.movimentosAberto = [] as ItemDemosntrativoFinanceiroDto[];


    await this.movimentoFinanceiroService.reportdemostrativofinancerio().then(data => {
      this.demostrativoFinancerio = data;
     });
    this.empresaService.findById1(this.storage.getLocalUser().idCompany).then(
      (resp) => {
        this.empresa = resp;
        console.log(resp);

      }
    )
  }
  printview() {
    this.spinner.show();
    setTimeout(() => {
      this.movimentoFinanceiroService.viewpddemonstrativosintetico().subscribe(
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
  printlivrocaixa() {
    this.spinner.show();
    setTimeout(() => {
      this.movimentoFinanceiroService.getviewlivrocaixa(this.datainicio,this.datafim).subscribe(
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
  printvieexercicio(exercicio) {
    this.spinner.show();
    setTimeout(() => {
      this.movimentoFinanceiroService.viewpddemonstrativosinteticoexercicio(exercicio).subscribe(
        (response) => {
          console.log(response);
          const file = new Blob([response], { type: 'application/pdf' });

          console.log(file);
          const fileURL = URL.createObjectURL(file);

          console.log(fileURL);
          window.open(fileURL);

          this.spinner.hide();
        });
    }, 1000);
  }
  printvieperiodo(exercicio, mes) {
    //this.spinner.show();
    setTimeout(() => {
      this.movimentoFinanceiroService.getviewsinteticoperiodo(exercicio, mes).subscribe(
        (response) => {
          console.log(response);
          const file = new Blob([response], { type: 'application/pdf' });

          console.log(file);
          const fileURL = URL.createObjectURL(file);

          console.log(fileURL);
          window.open(fileURL);

          this.spinner.hide();
        });

    }, 1000);
  }
  async loadprint(exercicio, mes) {
    this.mes = mes;
    this.exercicio = exercicio;


   await  this.movimentoFinanceiroService.getviewsinteticoperiodo(exercicio, mes)
 .subscribe(
  (response) => {
    console.log(response);
    const file = new Blob([response], { type: 'application/pdf' });

    console.log(file);
    const fileURL = URL.createObjectURL(file);

    console.log(fileURL);
    window.open(fileURL);

    this.spinner.hide();
      },
      error => { }

    ); 



  }
  async printContas(exercicio, mes) {

    this.exercicio = exercicio;
    this.mes = mes;
   // await this.printvieperiodo(exercicio, mes);
   await this.movimentoFinanceiroService.demonstrativoatualperiodo(exercicio, mes)
   .then(data => {
    this.demosntrativoFinanceiroDto = data;
    console.log(data);
    setTimeout(() => {
      window.print();
    }, 1000);
   });

    // this.spinner.hide();
    //window.open(url, '_blank');
  }
}
