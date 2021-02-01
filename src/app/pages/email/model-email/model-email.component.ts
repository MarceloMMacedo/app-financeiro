import { DestinationEmail } from './../../../models/report/destination-email';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StorageService } from 'src/app/services/storage.service';
import { Contato } from 'src/app/models/contato';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-model-email',
  templateUrl: './model-email.component.html',
  styleUrls: ['./model-email.component.css']
})
export class ModelEmailComponent implements OnInit {
  @Input() name;
  @Output() htmlContent  ;
  @Output() destinatariemailemitter= new EventEmitter<DestinationEmail>();
  destinationEmail:DestinationEmail;
  listaDestinos:string[];
contacts:Contato;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Digite sua mensagem aqui',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(
    private storege:StorageService,
    private funcionariosServices:FuncionarioService,
  ) { }

  ngOnInit(): void {
    this.destinationEmail={} as DestinationEmail;
    this.funcionariosServices.getcontacts(this.storege.getIdUser().id).subscribe(
      
    )
  }
  send() {
    console.log('this-' + this.destinationEmail.html);
    this.destinatariemailemitter.emit(this.destinationEmail);
  }
}
