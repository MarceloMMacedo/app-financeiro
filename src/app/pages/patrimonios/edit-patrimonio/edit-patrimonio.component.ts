import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { PatrimoniosService } from 'src/app/services/patrimonios.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { UtilsService } from 'src/app/services/utils.service';
import { stringify } from '@angular/compiler/src/util';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Modelo } from 'src/app/models/modelo';
import { Patrimonio } from 'src/app/models/patrimonio';
import { Observable } from 'rxjs';
import { BaseDto } from 'src/app/models/dto/base-dto';
@Component({
  selector: 'app-edit-patrimonio',
  templateUrl: './edit-patrimonio.component.html',
  styles: [`
  .d-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 100px;
    grid-gap: 7px;
  }

  .item {
    position: relative;
  }

  .item:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  .item:nth-child(2) {
    grid-column: 2;
    grid-row: 0 / 2;
  }

  .item:nth-child(3) {
    grid-column: 2;
    grid-row: 2 / 2;
  }



  .item a {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
  }

  .item img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  nz-select {
        width: 240px;
      }
      nz-divider {
        margin: 4px 0;ß
      }
      .container {
        display: flex;
        flex-wrap: nowrap;
        padding: 8px;
      }
      input {
      }
      .add-item {
        flex: 0 0 auto;
        padding: 8px;
        display: block;
      }
    `]
})
export class EditPatrimonioComponent implements OnInit {

  modelos: Modelo[];
  patrimonio: Patrimonio;
  index = 0;
  select2: any;
  index1;
  typepatrimonio: BaseDto[] = [] as BaseDto[];
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
    inputMode: CurrencyMaskInputMode.NATURAL
  };

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private patrimoniosService: PatrimoniosService,
    private modeloService: ModeloService,
    public storage: StorageService,
    private modal: NzModalService,
    private utilService: UtilsService) { }



  ngOnInit(): void {


    this.patrimonio = {} as Patrimonio;
    this.patrimonio.modelo = [] as Modelo;
    this.modeloService.getAll().subscribe(
      rest => {
        console.log(rest)
      });
    this.route.params.subscribe(params => this.index1 = params['id']);
    this.spinner.show();
    setTimeout(() => {
      this.patrimoniosService.gettipoPatrimonio().subscribe(
        rest => this.typepatrimonio = rest
      )
      this.modeloService.getAll().subscribe(
        rest => this.modelos = rest
      );
      this.patrimoniosService.findById(this.index1).subscribe(
        res => {
          this.patrimonio = res;

          console.log(res);
        })


      this.spinner.hide();
    }, 500);
    /* $('#OpenImgUpload1').click(function () { $('#imgupload1').trigger('click'); });
        $('#OpenImgUpload2').click(function () { $('#imgupload2').trigger('click'); });
        let modelo: Modelo = {} as Modelo;
    */
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    console.log(value);
    if (this.modelos.filter((item: Modelo) => item.name.toUpperCase().indexOf(value.toUpperCase()) === -1)
    ) {
      let m: Modelo = {} as Modelo;
      m.name = value;
      this.modeloService.insert(m).subscribe(
        rest => {
          m.id =  parseFloat( rest.body);
          this.modelos = [...this.modelos, m];
        }
      )

    }
  }
  baixarpatrimonio(event,id) {
    this.modal.confirm({
      nzTitle: 'Deseja Alterar Baixar Patrimônio?',
      nzContent: '<b style="color: red;">O Patrimônio será baixado como bem da empresa</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {

      },
      nzCancelText: 'Não'
    });
  }

  onUploadMainImage(event) {
    this.modal.confirm({
      nzTitle: 'Deseja Alterar Imagem Patrimônio?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.patrimoniosService.uploadPicture(this.patrimonio, event, "Patrimonio");
        setTimeout(() => {
          this.patrimoniosService.findById(this.index1).subscribe(
            rest =>
              this.patrimonio = rest
          )
        }, 100);
      },
      nzCancelText: 'Não'
    });
  }

  onClickImagePrincipal() {
    $('#imgupload').trigger('click');
  }
  save() {
    this.spinner.show();
    setTimeout(() => {
      this.patrimoniosService.save(this.patrimonio).subscribe();
      this.spinner.hide();
    }, 500);
  }
}
