import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { UtilsService } from 'src/app/services/utils.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { async } from '@angular/core/testing';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Patrimonio } from 'src/app/models/patrimonio';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-remove-patrimonio',
  templateUrl: './remove-patrimonio.component.html',
  styleUrls: ['./remove-patrimonio.component.css']
})
export class RemovePatrimonioComponent implements OnInit {
  patrimonio: Patrimonio;
  index: string;
  select2: any;
  image: string;
  image1: string;
  image2: string;
  typepatrimonio: string[];
  dateFormat = 'dd/MM/yyyy';

  removido = false;

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
    inputMode: CurrencyMaskInputMode.NATURAL
  };
  modalOptions: NgbModalOptions;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patrimoniosService: PatrimoniosService,
    public storage: StorageService,
    private utilService: UtilsService,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    $('#OpenImgUpload').click(function () { $('#imgupload').trigger('click'); });

    this.route.params.subscribe(params => this.index = params['id']);

    this.patrimoniosService.findById(this.index).subscribe(
      res => {
        this.patrimonio = res;
        console.log(res);
      }
    )
  }

  save() {
    this.spinner.show();
    console.log(this.patrimonio);
    setTimeout(() => {
      this.patrimoniosService.save(this.patrimonio).subscribe(
        res => {
          this.removido = true;
          this.utilService.createNotification('success', "Operação de Gravação com sucesso", "Patrimônio removido com sucesso");
        }
      );
      this.spinner.hide();
    }, 200);
    if (this.removido == true) {
      this.router.navigate[('/patrimonios')];
    }
  }


  async onUploadMainImage(event) {
    this.modal.confirm({
      nzTitle: 'Deseja incluir imagem do Bem',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.patrimoniosService.uploadPictureRemocao(this.patrimonio, event, "Patrimonio");
        setTimeout(() => {
          this.patrimoniosService.findById(this.index).subscribe(
            rest =>
              this.patrimonio = rest
          )
        }, 100);
      },
      nzCancelText: 'Não'
    });
  }
  getFileExtension2(filename) {
    return filename.split('.').pop();
  }
  openModalclonarGrupo() {
    this.modal.confirm({
      nzTitle: 'Deseja Remover Patrimônio?',
      nzContent: '<b style="color: red;">Depois desta opração o patrimoônio será removido da lista.</b>',
      nzOkText: 'Confirmar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.save();
      },
      nzCancelText: 'Cancelar',
      nzOnCancel: () => {
        this.patrimonio.status = 'Ativo';
        this.utilService.createNotification("warning", 'Operação cancelado', 'Operação de Remoção cancelado');
      }
    });

  }
}
