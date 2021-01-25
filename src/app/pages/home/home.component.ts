import { Component, OnInit } from '@angular/core';
import { BaseDto } from 'src/app/models/dto/base-dto';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: BaseDto;

  constructor(
    public storage: StorageService,
    private router: Router,
    private funcionarioService: FuncionarioService) {
    this.usuario = {} as BaseDto;
  }

  ngOnInit(): void {
    this.funcionarioService.findperfil(this.storage.getLocalUser().email).subscribe(
      (resp) => {
        this.usuario = resp;
        console.log(resp)
      }
    )
  }
  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['login']);
  }
}
