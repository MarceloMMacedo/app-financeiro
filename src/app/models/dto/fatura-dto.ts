import { FichaLeituraDto } from "./ficha-leitura-dto";

export interface FaturaDto {
  id?: number;
  numerodocumento?:string;
  name?: string;
  dataVencimento?: Date;
  parcela?: number;
  jurus?: number;
  multa?: number;
  desconto?: number;
  valor?: number;
  file?: FormData;
  idbanco?: number;
  dataquitacao?: Date;
  formapagamento?:string;
  status?:string;
  fichaLeitura?:FichaLeituraDto[];
}
