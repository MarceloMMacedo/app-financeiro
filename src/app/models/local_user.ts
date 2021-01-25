import { Pessoa } from './pessoa';
export interface LocalUser {
    token: string;
    email: string;
    idCompany?:string;
    empresa?:Pessoa;
}
