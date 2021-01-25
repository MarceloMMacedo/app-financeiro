import { Injectable } from "@angular/core";
import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Pessoa } from '../models/pessoa';
/*import { CompanyDTO } from '../models/company/company-dto';
import { Company } from '../models/company/company';*/


@Injectable()
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
  }setCompany(obj: Pessoa) {
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(obj));
    }
    else {
      localStorage.removeItem(STORAGE_KEYS.company);
    }
  } 
  /* getCart() : Cart {
       let str = localStorage.getItem(STORAGE_KEYS.cart);
       if (str != null) {
           return JSON.parse(str);
       }
       else {
           return null;
       }
   }

   setCart(obj : Cart) {
       if (obj != null) {
           localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
       }
       else {
           localStorage.removeItem(STORAGE_KEYS.cart);
       }
   }*/
}
