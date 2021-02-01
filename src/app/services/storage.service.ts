import { Injectable } from "@angular/core";
import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Pessoa } from '../models/pessoa';
import { BaseDto } from '../models/dto/base-dto';
/*import { CompanyDTO } from '../models/company/company-dto';
import { Company } from '../models/company/company';*/


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }
  /*getCompany(): Pessoa {
    let comp = localStorage.getItem(STORAGE_KEYS.company);
    if (comp != null) {
      return JSON.parse(comp);
    }
    else {
      return null;
    }
  }*/
  getCompany(): Pessoa {
    let comp = localStorage.getItem(STORAGE_KEYS.company);
    if (comp != null) {
      return JSON.parse(comp);
    }
    else {
      return null;
    }
  } setCompany(obj: Pessoa) {
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(obj));
    }
    else {
      localStorage.removeItem(STORAGE_KEYS.company);
    }
  }

  getIdUser(): BaseDto {
    let usr = localStorage.getItem(STORAGE_KEYS.idUser);
    if (usr == null) {
      return null; 
    }
    else {
      return JSON.parse(usr);
    }
  }

  setIdUser(obj: BaseDto) {
    console.log(obj);
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.idUser, JSON.stringify(obj));
    }
    else {
      localStorage.removeItem(STORAGE_KEYS.idUser);
    }
  }
}
