import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flattenTreeData } from 'ng-zorro-antd/core/tree';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContasBancaria } from 'src/app/models/contas-bancaria';
import { FaturaDto } from 'src/app/models/dto/fatura-dto';
import { BancomovimentoService } from 'src/app/services/bancomovimento.service';
import { MovimentoSaidaService } from 'src/app/services/movimento-saida.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-quitar-fatura-saida',
  templateUrl: './quitar-fatura-saida.component.html',
  styleUrls: ['./quitar-fatura-saida.component.css']
})
export class QuitarFaturaSaidaComponent implements OnInit {
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
  finalizado: boolean;
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

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private movimentoSaidaService: MovimentoSaidaService,
    private utilService: UtilsService,
    private bancosService: BancomovimentoService) { }

  ngOnInit(): void {

    this.spinner.show();
    this.fatura = {} as FaturaDto;
    this.formData = new FormData();
    this.route.params.subscribe(params => this.index = params['id']);
    this.route.params.subscribe(params => this.exercicio = params['exercicio']);
    this.bancosService.getAll().subscribe(
      rest => this.bancos = rest
    )

    this.movimentoSaidaService.quitarfatura(this.index).then(
      rest => {
        rest.dataquitacao = new Date();
        if (rest.status == 'Aberto') { this.finalizado = false } else { this.finalizado = true; }
        // rest.idbanco = this.bancos[0].id;
        rest.formapagamento = 'Dinheiro';
        rest.numerodocumento = '';
        this.fatura = rest;
        this.somatotal();
        this.spinner.hide();
      }
    )
  }
  somatotal() {
    this.total = this.fatura.jurus + this.fatura.valor - this.fatura.desconto;
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
  save() {
    this.modal.confirm({
      nzTitle: 'Deseja Quitar Fatura?',
      nzContent: '<b style="color: red;">A Fatura sera Quitada</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: async () => {


      await  this.movimentoSaidaService.save(this.fatura).then(
          ( ) => {

            this.finalizado = true;
            this.utilService.createNotification('success', 'Operação com sucesso', 'Dados gravados com sucesso')
            this.spinner.hide();
          },
          error => {
            let errorMessage;
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
       //     this.utilService.createNotification('error', 'Alerta', errorMessage)
          }
        );
        this.movimentoSaidaService.uploadPicture(this.index, this.formData);
       /* this.movimentoSaidaService.quitarfatura(this.index).subscribe(
          rest => {
            rest.dataquitacao = new Date();
            if (rest.status == 'Aberto') { this.finalizado = false } else { this.finalizado = true; }


            this.fatura = rest;
            this.somatotal();
            this.spinner.hide();
          }
        );
*/


      },
      nzCancelText: 'Não'
    });
  }

  voltar() {
    this.router.navigate(['resumocontaspagar', this.exercicio]);
  }


}
