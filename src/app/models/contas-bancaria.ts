import { BaseDto } from './dto/base-dto';



export interface ContasBancaria {
  id?: number;
  pessoa?: BaseDto;
  descricao?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  saldo?:number;
  saldoRetido?:number;
  saldoDisponivel?:number;

}
