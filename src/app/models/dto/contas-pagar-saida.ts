import { GrupoFinanceiro } from "../grupo-financeiro";
import { FaturaDto } from "./fatura-dto";

export interface ContasPagarSaida {
  id?: number;
  name?: string;
  dataVencimento?: Date;
  parcela?: number;
  valor?:number;
  historico?: string;
  faturas?:FaturaDto[];
  valorAberto?:number;
  valorQuit?:number;

}
