import { Fatura } from './fatura';
import { CentroCusto } from './centro-custo';
import { AgregadoFinanceiro } from './agregado-financeiro';

export interface GrupoFinanceiro {
    id?: number;
    name?: string;
    centrocusto?: CentroCusto;
    agregadofinanceiros?: AgregadoFinanceiro[];
    percentual?: number;
    percentualAgregados?: number;
    percentualTotal?: number;
    percentualComplamento?: number;

}
