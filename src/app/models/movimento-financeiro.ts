import { Contrato } from './contrato';
import { Fatura } from './fatura';
import { GrupoFinanceiro } from './grupo-financeiro';

import { Pessoa } from './pessoa';

export interface MovimentoFinanceiro {
    id?: number;
    name?: string;
    faturas?: Fatura[];
    valor?: number;
    dataMovimento?: Date;
    dataVencimento?: Date;
    dataQuitacao?: Date;
    parcela?: number;
    status?: string;
    tipomovimento?: string;
    historico?: GrupoFinanceiro;
    faturasAberto?: Fatura[];
    faturasQuit?: Fatura[];
    valorAberto?: number;
    valorQuit?: number;
    valorFaturas?:number;
} 
