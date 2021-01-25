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
@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.css'], styles: [
    `app-prin-contrato {
      /* hide the printing component from @media screen  */
      display: none;
   }

   @media print {
      /* invert the display (show/hide) properties of the main */
      /* aplication component and the printing component       */
      app-prin-contrato {
          display: block;
      }
       .pagina{
          display: none;
      }
   }


    `
  ]
})
export class NovoContratoComponent implements OnInit {
  contrato: Contrato;
  equipamento: EquipamentoContrato;
  clientes: BaseDto[];
  patrimonios: Patrimonio[];

  grupocontarto$: GrupoFinanceiro[];

  frame: SafeResourceUrl;
  isVisible = false;
  isVisibleedit = false;

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
    private empresaService: CompanyService
  ) { }
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

            this.changeIframe();
          }
        );


      }, 100);

    }
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
    this.modal.confirm({
      nzTitle: 'Deseja Incluir Contrato?',
      nzContent: '<b style="color: red;">Os dados serão salvos e Faturas de cobranças serão geradas </b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        setTimeout(() => {
            this.contratoService.insert(this.contrato).subscribe(
              resp => {
                this.index = (resp.body);
                setTimeout(() => {
                    this.contratoService.regerarparcelas(this.index, this.contrato.cliente.id, this.contrato.financeiroContrato.id).subscribe();
                }, 10);

                this.router.navigate(['/contratos', resp.body]);

              }
            );


        }, 10);

      },
      nzCancelText: 'Não'
    });
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
    /*setTimeout(() => {
          this.contratoService.regerarparcelas(this.index).subscribe(
            rest => {
              this.contrato = rest;
            }
          )
        }, 10);
        this.save();*/
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
      this.frame = this.getSafeUrl(this.contrato.imageContratoView);
    }, 100)
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
}
