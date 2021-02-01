import { DestinationEmail } from './../../../models/report/destination-email';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StorageService } from 'src/app/services/storage.service';
import { Contato } from 'src/app/models/contato';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { stringify } from 'querystring';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-model-email',
  templateUrl: './model-email.component.html',
  styleUrls: ['./model-email.component.css'],
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `]
})
export class ModelEmailComponent implements OnInit {
  @Input() name;
  @Output() htmlContent;
  @Output() destinatariemailemitter = new EventEmitter<DestinationEmail>();
  @Output() adddestinatariemailemitter = new EventEmitter<Contato>();
  destinationEmail: DestinationEmail;
  listaDestinos: string[];
  contacts: Contato[];
  contact: Contato;
  email;
  nome;
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
    private storege: StorageService,
    private funcionariosServices: FuncionarioService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.destinationEmail = {} as DestinationEmail;
    this.destinationEmail.to=[] as string[];
    this.destinationEmail.html='';
    this.destinationEmail.messageSubject='';
    this.contact={} as Contato;
    this.funcionariosServices.getcontacts(this.storege.getIdUser().id).subscribe(
      rest => {
        this.contacts = rest;
      }
    )
  }
  send() {
    //console.log('this-' + this.destinationEmail.html);
    this.destinatariemailemitter.emit(this.destinationEmail);  
  }
adddestinatario(){
 
  //if (this.contacts.indexOf(this.contact) === -1) {
    this.contacts = [...this.contacts, this.contact]
       
 // }
    this.nzMessageService.info('Adicionado com sucesso');
    this.adddestinatariemailemitter.emit(this.contact);
}
cancel(){

  this.nzMessageService.info('o Email não foi adicionado');
}
}
