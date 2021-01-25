import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/shared/account.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login = {
    email: '',
    senha: ''
  };
 constructor(
    private accountService: AccountService,
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {
    try {
      let localUser = this.storage.getLocalUser();
      console.log(localUser);

      const token = localUser.token;//window.localStorage.getItem('token');
      if (token != null) {
        this.accountService.refreshToken()
          .subscribe(response => {
            this.accountService.successfulLogin(response.headers.get('Authorization'),
              response.headers.get('ID_Company'));
            //console.log('reflash : ' + response.headers.get('Authorization'));
            this.router.navigate(['index']);
          },
            error => {
              this.accountService.logout();
              this.router.navigate(['login'])
            });
      }
    } catch (error) {
      this.accountService.logout();

      this.router.navigate(['login'])
    }
  }

  async onSubmit() {

    try {
      this.accountService.login(this.login);
      console.log('Login efetuado');

    } catch (error) {
      console.error(error);
    }
  }

}
