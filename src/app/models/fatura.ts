import { AgregadoFinanceiro } from './agregado-financeiro';
import { GrupoFinanceiro } from './grupo-financeiro';
import { MovimentoFinanceiro } from './movimento-financeiro';

export interface Fatura {

    id?: number;
    status?: string;
    naturezamovimento?: string;
    historico?: GrupoFinanceiro;
    valor?: number;
    dataMovimento?: Date;
    dataVencimento?: Date;
    dataQuitacao?: Date;
    parcela?: number;
    jurus?: number;
    multa?: number;
    Desconto?: number;
    total?: number;
    movimentoFinanceiro?: MovimentoFinanceiro;
    agregadoFinanceiros?: AgregadoFinanceiro[];




}
