import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext, ɵSafeResourceUrl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contrato } from 'src/app/models/contrato';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { EquipamentoContrato } from 'src/app/models/equipamento-contrato';
import { MovimentoFinanceiro } from 'src/app/models/movimento-financeiro';
import { Patrimonio } from 'src/app/models/patrimonio';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GrupoFinanceiro } from '../../../models/grupo-financeiro';
import { GrupocontratoService } from '../../../services/grupocontrato.service';
import { Subscriber } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CompanyService } from '../../../services/company.service';
import { Pessoa } from '../../../models/pessoa';
import { Endereco } from '../../../models/endereco';


@Component({
  selector: 'app-edit-contrato',
  templateUrl: './edit-contrato.component.html',
  styleUrls: ['./edit-contrato.component.css'],
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
export class EditContratoComponent implements OnInit {
  contrato: Contrato;
  equipamento: EquipamentoContrato;
  clientes: BaseDto[];
  patrimonios: Patrimonio[];
  cliente: Pessoa;

  grupocontarto$: GrupoFinanceiro[];

  frame: SafeResourceUrl;
  isVisible = false;
  isVisibleedit = false;
  dataforum;
  movimentoFianaceiro:MovimentoFinanceiro;

  periodo;
  empresa: Pessoa;

  isSpinning: boolean = false;
  dateFormat = 'dd/MM/yyyy';
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
  index: string;
  // dataClintecnp: DataClintecnpj;
  constructor(
    public storage: StorageService,
    public contratoService: ContratoService,
    public cepService: UtilsService,
    private utilService: UtilsService,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private patrimonioService: PatrimoniosService,
    private grupoFinanceiroService: GrupocontratoService,
    private modal: NzModalService,
    private sanitizer: DomSanitizer,
    private empresaService: CompanyService,
    private clienteservice: ClienteService,
  ) {

  }
  ngOnInit(): void {
    this.equipamento = {} as EquipamentoContrato;
    this.route.params.subscribe(params => this.index = params['id']);

    this.contrato = {} as Contrato;
    this.contrato.cliente = {} as BaseDto;
    this.contrato.financeiroContrato = {} as GrupoFinanceiro;
    this.contrato.isFranquia = 'Sim';
    this.contrato.equipamentosContratos = [] as EquipamentoContrato[];
    this.contrato.movimentoFinanceiros = [] as MovimentoFinanceiro[];
    this.contrato.movimentoFinanceirosAberto = {} as MovimentoFinanceiro;
    this.contrato.imageContratoView = '';
    this.empresa = {} as Pessoa;
    this.empresa.enderecoPrincipal = {} as Endereco;
    this.cliente = {} as Pessoa;
    this.cliente.enderecoPrincipal = {} as Endereco;
    this.movimentoFianaceiro={} as MovimentoFinanceiro;
    setTimeout(() => {

      this.empresaService.findById(this.storage.getLocalUser().idCompany).subscribe(
        (resp) => {
          this.empresa = resp;
          console.log(resp);

        }
      )
      this.clienteService.getAll().subscribe(
        rest => {
          this.clientes = rest;
        }
      )
      this.grupoFinanceiroService.getAll().subscribe(
        rest => {
          this.grupocontarto$ = rest;
        }
      );
      this.patrimonioService.getAll().subscribe(
        rest => this.patrimonios = rest
      )
    }, 100);
    if (this.index != '0') {
      setTimeout(() => {
        this.contratoService.findById(this.index).subscribe(
          rest => {
            this.contrato = rest;
            console.log(rest);
         //   const numero = require('numero-por-extenso');
            this.periodo = (this.contrato.periodo);
            this.clienteservice.findById(this.contrato.cliente.id).subscribe(
              rest => this.cliente = rest
            )
            this.contratoService.movimentocontrato(this.contrato.id).subscribe(
              rest => this.movimentoFianaceiro = rest
            )
            this.changeIframe();
          }
        );


      }, 10);

    }
    this.dataforum = new Date();// dia + ' de ' + meses[mes] + ' de ' + ano;


  }
  onUploadMainImage(event) {

    this.modal.confirm({
      nzTitle: 'Deseja Alterar Inserir Contrato?',
      nzContent: '<b style="color: red;">O arquivo do contrato será salvo</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.spinner.show();
        setTimeout(() => {
          this.contrato = this.contratoService.uploadPicture(this.contrato, event, "contrato");
          this.contratoService.save(this.contrato);
          this.load();
        }, 100)
      },
      nzCancelText: 'Não'
    });

  }
  save() {
    setTimeout(() => {
      if (this.index != '0') {
        this.contratoService.save(this.contrato);

      } else {
        this.contratoService.insert(this.contrato).subscribe(
          resp => {
            this.index = (resp.body);
            this.router.navigate(['/contratos', resp.body]);

          }
        );

      }

    }, 10);
    setTimeout(() => {

      this.contratoService.findById(this.index).subscribe(
        rest => {
          this.contrato = rest;
          this.contratoService.movimentocontrato(this.contrato.id).subscribe(
            rest => this.movimentoFianaceiro = rest
          )

        }
      )
    }, 100);
    this.changeIframe();
  }
  printContas() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      window.print();
    }, 100);

    // this.spinner.hide();
    //window.open(url, '_blank');
  }

  newEquipamento() {
    this.equipamento = {} as EquipamentoContrato;
    this.equipamento.equipamento = {} as Patrimonio;
    this.contratoService.patrimonios().subscribe(
      rest => this.patrimonios = rest
    )
    this.isVisible = true;
  }
  editEquipamento(e: EquipamentoContrato) {
    this.equipamento = e;
    this.contratoService.patrimonios().subscribe(
      rest => this.patrimonios = rest
    )
    this.isVisibleedit = true;
  }
  deletePatrimonio(id, indice) {
    //console.log(id);
    this.modal.confirm({
      nzTitle: 'Deseja Excluir Equipamento?',
      nzContent: '<b style="color: red;">Após exclusão o agreagado será removido',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        setTimeout(() => {
          this.contratoService.deleteequipamento(indice);
          this.contrato.equipamentosContratos.splice(id, 1);
          this.contratoService.findById(this.index).subscribe(
            rest => {
              this.contrato = rest;

            }
          )
        }, 100);
      },
      nzCancelText: 'Não'
    });
  }
  gerarfaturas() {
    this.modal.confirm({
      nzTitle: 'Deseja Regerar Parcelas?',
      nzContent: '<b style="color: red;">Os dados serão salvos e Faturas de cobranças serão geradas </b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {


    setTimeout(() => {
      this.contratoService.regerarparcelas(this.index, this.contrato.cliente.id, this.contrato.financeiroContrato.id).subscribe(
        rest => {
          this.contrato = rest;
          this.contratoService.movimentocontrato(this.contrato.id).subscribe(
            rest => this.movimentoFianaceiro = rest
          )
        }
      )
    }, 10);
    this.save();
  },
  nzCancelText: 'Não'
});
  }

  handleOk(): void {
    this.isVisible = false;

    this.isVisibleedit = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleedit = false;
  }
  handleAddPatrimonio() {
    if (this.equipamento.equipamento.id == null) {
      this.modal.error({
        nzTitle: 'Selecione Equipamento',
      });
    } else {
      console.log(this.equipamento);
      this.contrato.equipamentosContratos.push(this.equipamento);
      this.isVisible = false;
    }
  }
  handleEditPatrimonio() {
    if (this.equipamento.equipamento.id == null) {
      this.modal.error({
        nzTitle: 'Selecione Equipamento',
      });
    } else {

      this.isVisibleedit = false;
    }

  }
  onClickImagePrincipal() {
    console.log('1');
    $('#imgupload').trigger('click');
  }
  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  changeIframe() {
    setTimeout(() => {
    if(this.contrato.imageContratoView.length>0)
    this.frame = this.getSafeUrl(this.contrato.imageContratoView);
    }, 100);
    if (this.contrato.imageContratoView == null) this.contrato.imageContratoView = '';
  }
  downloadContrato() {
    let url = this.getSafeUrl(this.contrato.imageContratoView);
    window.open((this.contrato.imageContratoView));
  }
  load() {
    setTimeout(() => {

      this.contratoService.findById(this.index).subscribe(
        res => {
          this.contrato = (res);
          this.spinner.hide();
          this.frame = this.sanitizer.bypassSecurityTrustResourceUrl(this.contrato.imageContratoView);

        }
      )
    }, Math.floor(1001) + 10)
  }
  /* contrato: Contrato;
   clientes: Observable<Pessoa[]>;
   grupocontarto$: Observable<HistoricoPadrao[]>
   index;
   indexequipamento = 0;
   dateFormat = 'dd/MM/yyyy';
   equipamento: EquipamentoContrato;
   isNewEquipamento = true;
   movimento: MovimentoFinanceiro;
   frame: SafeResourceUrl;
   usuario: BaseDto;
   patrimonios: Observable<Patrimonio[]>;
   fileUrl;

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
   constructor(
     public storage: StorageService,
     private router: Router,
     private contratoService: ContratoService,
     private spinner: NgxSpinnerService,
     private modalService: NgbModal,
     private route: ActivatedRoute,
     private clienteServices: ClienteService,
     private historicoService: HistoricoService,
     private utilService: UtilsService,
     private modal: NzModalService,
     private patrimonioService: PatrimoniosService,
     private movimentofinanceiroService: MovimentoFinanceiroService,
     private sanitizer: DomSanitizer,private http: HttpClient

   ) { }
   newContrato(): Contrato {
     let contrato: Contrato;
     contrato = {} as Contrato;
     contrato.id = '0';
     contrato.cliente = {} as Pessoa;
     contrato.historicoPadrao = {} as HistoricoPadrao;
     contrato.equipamentos = [] as EquipamentoContrato[];
     contrato.dataInicio = new Date();
     contrato.dataPrimeiroVencimento = new Date();
     contrato.dataInstalacao = new Date();
     contrato.periodos = 12;
     contrato.diaLeitura = 15;
     contrato.diaVencimento = 15;
     contrato.isFranquia = 'false';
     contrato.totalnoFranquia = 0;
     contrato.valorFranquia = 0;
     contrato.imageContrato = null;
     contrato.imageContratoView = null
     contrato.status = 'Aberto';
     contrato.valor = 0.0;
     contrato.movimentoFinanceiro = {} as MovimentoFinanceiro;
     contrato.agregadoFinanceiros = [] as AgregadoFinanceiro[];
     this.newEquipamento;
     return contrato;
   }
   ngOnInit(): void {
     $('#OpenImgUpload').click(function () {
       $('#imgupload').trigger('click');
     });
     this.contrato = this.newContrato();
     this.newEquipamento();
     this.route.params.subscribe(params => this.index = params['id']);
     if (this.index == '0') {
       this.contrato = this.newContrato();
     }
     else {
       this.contratoService.findById(this.index).subscribe(
         rest => {
           this.contrato = rest;
           console.log(rest);
           this.frame = this.sanitizer.bypassSecurityTrustResourceUrl(rest.imageContratoView) ;
           console.log(this.frame);
           try {
             console.log(rest.equipamentos.length);
             if (rest.equipamentos.length == 0) {
               this.newEquipamento();
               this.isNewEquipamento = true;
             } else {
               this.equipamento = rest.equipamentos[0];
               this.isNewEquipamento = false;
             }
           } catch (e) {
             this.equipamento = {} as EquipamentoContrato;
             this.isNewEquipamento = true;
           }

         }
       )
     }
     this.clientes = this.clienteServices.getAll();
     this.grupocontarto$ = this.historicoService.getAll();
     this.patrimonios = this.patrimonioService.getAllnowinthcontrato();


   }
   save() {
     let m: MovimentoFinanceiro = {} as MovimentoFinanceiro;
     if (this.contrato.id == '0') {
       m.historicoPadrao = this.contrato.historicoPadrao;
       m.id = null;
       m.name = "Receber de Contrato - " + this.contrato.name;
       m.parcelas = this.contrato.periodos;
       // this.grupoMovimentacao = this.contrato.getGrupoContrato();
       m.valor = this.contrato.valor;
       m.pessoa = {} as Pessoa;
       m.pessoa.id = this.contrato.cliente.id;

       m.tipo = 'Contrato';
       m.instantCreation = new Date();

       m.status = 'Ativo';
       setTimeout(() => {
         this.movimentofinanceiroService.insert(m).subscribe(
           rest => {
             m.id = rest.body;

           }
         );

       }, Math.floor(100) + 10);

       setTimeout(() => {
         console.log(m.id);
         this.contrato.movimentoFinanceiro.id = m.id;
         this.contratoService.insert(this.contrato).subscribe(
           rest => {
             this.index = rest.body;
             this.contrato.id = rest.body;
             // m.contrato = {} as Contrato;
             m.contrato = this.contrato;
             this.movimentofinanceiroService.save(m);
             this.router.navigate(['/contratos', rest.body]);
           })
       }, Math.floor(1050) + 10);

     } else {
       this.contratoService.save(this.contrato);
       this.load();
     }
     // this.saveMovimento(m);
     //   this.changeIframe() ;
   }
   saveMovimento(m: MovimentoFinanceiro) {
     setTimeout(() => {
       this.movimentofinanceiroService.save(m);

     }, Math.floor(1050) + 10);
   }
   load() {
     setTimeout(() => {

       this.contratoService.findById(this.index).subscribe(
         res => {
           this.contrato = (res);
           console.log(res);
           this.spinner.hide();
           this.frame = this.sanitizer.bypassSecurityTrustResourceUrl(this.contrato.imageContratoView) ;
           this.equipamento = this.contrato.equipamentos[this.indexequipamento];
         }
       )
     }, Math.floor(1001) + 10)
   }
   updatevalorequipamento() {
     this.equipamento.valor = this.equipamento.valorfranquia * this.equipamento.franquia;
   }
   editEquipamento(item: EquipamentoContrato, i) {
     this.equipamento = item;
     this.indexequipamento = i;
     this.isNewEquipamento = false;
   }
   saveEquipamento() {
     if (this.isNewEquipamento) {
       if (this.contrato.equipamentos.length == 0) this.contrato.equipamentos = [] as EquipamentoContrato[];
       this.contrato.equipamentos.push(this.equipamento);
       console.log(this.contrato.equipamentos);
       setTimeout(() => {
         this.contratoService.save(this.contrato);
         this.indexequipamento = this.contrato.equipamentos.length;
         this.load();
         this.isNewEquipamento = false;
       }, Math.floor(100) + 10)
       /* let p = this.equipamento.equipamento;
        p.codContrato = this.index;
        this.patrimonioService.save(p).subscribe();
        setTimeout(() => {
          this.patrimonios = this.patrimonioService.getAllnowinthcontrato();
        }, Math.floor(100) + 10)

     } else {
       this.contratoService.save(this.contrato);

       this.load();

     }
   }
   newEquipamento() {
     this.equipamento = {} as EquipamentoContrato;
     this.equipamento.equipamento = {} as Patrimonio;
     this.equipamento.equipamento.modelo = {} as Modelo;
     this.equipamento.setor = '';
     this.equipamento.valor = 0;
     this.equipamento.franquia = 0;
     this.equipamento.valorfranquia = 0;
     this.isNewEquipamento = true;
   }
   deleteEquipamento(i, equipamento: EquipamentoContrato) {
     this.modal.confirm({
       nzTitle: 'Deseja Excluir Equipamento do contrato?',
       nzContent: '<b style="color: red;">Não é preciso Salvar para gravar os dados</b>',
       nzOkText: 'Sim',
       nzOkType: 'danger',
       nzOnOk: () => {
         console.log(equipamento.equipamento.id);
         /*let p: Patrimonio = equipamento.equipamento;

         p.codContrato = "";
         this.patrimonioService.save(p).subscribe();
         this.contrato.equipamentos.splice(i, 1);
         this.contratoService.save(this.contrato);
         this.load();
         /*setTimeout(() => {
           this.patrimonios = this.patrimonioService.getAllnowinthcontrato();
         }, Math.floor(100) + 10)
       },
       nzCancelText: 'Não'
     });
   }
   clonar() {
     this.modal.confirm({
       nzTitle: 'Deseja Clonar Contrato?',
       nzContent: '<b style="color: red;">O Histórico padrão será clonado</b>',
       nzOkText: 'Sim',
       nzOkType: 'danger',
       nzOnOk: async () => {

         this.contrato.id = null;
         this.contrato.name = 'Contrato Clonado';
         this.contratoService.insert(this.contrato).subscribe(
           rest => {
             this.contrato.id = rest.body;
             this.router.navigate(['/contratos', rest.body]);
           }
         );

       },
       nzCancelText: 'Não'
     });
   }
   gerarfaturas() {
     setTimeout(() => {
       this.contratoService.save(this.contrato);
       this.movimentofinanceiroService.gerarparcelascontrato(this.contrato.id).subscribe(
         rest => this.contrato = rest
       );


     }, Math.floor(100) + 10);
   }

   printContas() {
     this.spinner.show();
     setTimeout(() => {
       this.spinner.hide();

     }, 200);
     window.print();
     // this.spinner.hide();
     //window.open(url, '_blank');
   }

   async onUploadMainImage(event) {

     this.modal.confirm({
       nzTitle: 'Deseja Alterar Inserir Contrato?',
       nzContent: '<b style="color: red;">O arquivo do contrato será salvo</b>',
       nzOkText: 'Sim',
       nzOkType: 'danger',
       nzOnOk: () => {
         this.contratoService.uploadPicture(this.contrato, event, "contrato");
         this.contratoService.save(this.contrato);
         this.load();
       },
       nzCancelText: 'Não'
     });

   }
   onClickImagePrincipal() {
     console.log('1');
     $('#imgupload').trigger('click');
   }
   getSafeUrl(url) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url)
   }

   changeIframe() {
     this.frame = this.getSafeUrl(this.contrato.imageContratoView)
   }
   downloadContrato(){
     let url=this.getSafeUrl(this.contrato.imageContratoView);
     window.open( (this.contrato.imageContratoView));
    }
    */
}
