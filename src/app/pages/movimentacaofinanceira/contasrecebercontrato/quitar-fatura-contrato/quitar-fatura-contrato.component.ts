import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flattenTreeData } from 'ng-zorro-antd/core/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContasBancaria } from 'src/app/models/contas-bancaria';
import { FaturaDto } from 'src/app/models/dto/fatura-dto';
import { FichaLeituraDto } from 'src/app/models/dto/ficha-leitura-dto';
import { BancomovimentoService } from 'src/app/services/bancomovimento.service';
import { MovimentoContratoService } from 'src/app/services/movimento-contrato.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-quitar-fatura-contrato',
  templateUrl: './quitar-fatura-contrato.component.html',
  styleUrls: ['./quitar-fatura-contrato.component.css']
})
export class QuitarFaturaContratoComponent implements OnInit {
  index;
  exercicio;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  fatura: FaturaDto;
  formData: FormData = new FormData();
  bancos: ContasBancaria[];
  total: number = 0;
  fichaLeitura: FichaLeituraDto;
  isVisibleedit = false;
  medidorref: number = 0;
  dateFormat = 'dd/MM/yyyy';
  flagisStatus: boolean;

  finalizado: boolean;
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

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private movimentoContratoService: MovimentoContratoService,
    private utilService: UtilsService,
    private message: NzMessageService,
    private bancosService: BancomovimentoService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fichaLeitura = {} as FichaLeituraDto;
    this.fatura = {} as FaturaDto;
    this.formData = new FormData();
    this.route.params.subscribe(params => this.index = params['id']);
    this.route.params.subscribe(params => this.exercicio = params['exercicio']);
    this.bancosService.getAll().subscribe(
      rest => this.bancos = rest
    )

    this.movimentoContratoService.quitarfatura(this.index).then(
      rest => {
        rest.dataquitacao = new Date();
        if (rest.status == 'Aberto') { this.finalizado = false } else { this.finalizado = true; }
        rest.idbanco = this.bancos[0].id;
        rest.formapagamento = 'Dinheiro';
        rest.numerodocumento = '';
        this.fatura = rest;
        this.somatotal();
        this.spinner.hide();
      }
    )
  }
  soma(valor: number): number {
    if (valor < 0)
      return 0;
    return valor;
  }
  somatotal() {
    let valor = this.fatura.fichaLeitura.reduce((valor, obj) => valor + obj.valorExcedente, 0);
    this.total = this.fatura.jurus + this.fatura.valor - this.fatura.desconto + valor;
  }
  selectFile(event) {

    this.selectedFiles = event.target.files;
    this.selectedFile = event.target.files[0];
    this.formData = new FormData();
    this.formData.set('file', this.selectedFile);
    /*
   this.fatura.file = new FormData();
   this.fatura.file.set('file', this.selectedFile);
   */
    this.changeImage = true;

  }
  verificaStatus(item) {
    console.log(item.status);
    return item.status == 'Aberto';
  }
  save() {
    if (this.fatura.status == 'Quit') {
      this.modal.error({
        nzTitle: 'Esta fatura já foi quitada',
      });

    } else {
      let res: FichaLeituraDto[] = this.fatura.fichaLeitura.filter(this.verificaStatus);
      if (res.length > 0) {
        this.modal.error({
          nzTitle: 'É preciso Atualizar todos os medidores dos equipamentos locados',
        });
      } else
        this.modal.confirm({
          nzTitle: 'Deseja Quitar Fatura?',
          nzContent: '<b style="color: red;">A Fatura sera Quitada</b>',
          nzOkText: 'Sim',
          nzOkType: 'danger',
          nzOnOk: async () => {

            await this.movimentoContratoService.save(this.fatura)
              .then(
                rest => {
                  this.finalizado = true;
                  rest.dataquitacao = new Date();
                  if (rest.status == 'Aberto') { this.finalizado = false } else { this.finalizado = true; }
                  rest.idbanco = this.bancos[0].id;
                  rest.formapagamento = 'Dinheiro';
                  rest.numerodocumento = '';
                  this.fatura = rest;
                  this.somatotal();
                  this.spinner.hide();
                }
              )
          },
          nzCancelText: 'Não'
        });
    }
  }
  voltar() {
    this.router.navigate(['resumocontasrecebercontrato', this.exercicio]);
  }
  handleCancel(): void {

    this.fichaLeitura.medidorAtual = this.medidorref;
    this.fichaLeitura.faturamentoExcedente = this.soma(this.fichaLeitura.medidorAtual - this.fichaLeitura.medidorAnterior - this.fichaLeitura.franquia);
    this.fichaLeitura.valorExcedente = this.soma(this.fichaLeitura.medidorAtual - this.fichaLeitura.medidorAnterior - this.fichaLeitura.franquia) * this.fichaLeitura.valorfranquia;
    this.somatotal();
    this.isVisibleedit = false;
  }
  editarFicha(event: FichaLeituraDto) {

    if (event.medidorAtual < event.medidorAnterior) {
      event.medidorAtual = event.medidorAnterior;
    }
    this.medidorref = event.medidorAtual;
    this.fichaLeitura = event;
    this.isVisibleedit = true;
  }
  confirLeitura() {
    this.fichaLeitura.faturamentoExcedente = this.soma(this.fichaLeitura.medidorAtual - this.fichaLeitura.medidorAnterior - this.fichaLeitura.franquia);
    this.fichaLeitura.valorExcedente = this.soma(this.fichaLeitura.medidorAtual - this.fichaLeitura.medidorAnterior - this.fichaLeitura.franquia) * this.fichaLeitura.valorfranquia;
    if (this.fichaLeitura.medidorAtual < this.fichaLeitura.medidorAnterior) {
      this.modal.error({
        nzTitle: 'medidor atual deve ser no mímo igual ao anterior',
      });


    } else
      this.modal.confirm({
        nzTitle: 'Deseja Atualizar Ficha?',
        // nzContent: '<b style="color: red;">Após exclusão o agreagado será removido',
        nzOkText: 'Sim',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.fichaLeitura.status = 'Quit';
          this.isVisibleedit = false;
        },
        nzCancelText: 'Não'
      });
    this.somatotal();
  }
  keyproducao() {

  }
}
