import { Contaprovisao } from './contaprovisao';
import { CentroCusto } from './centro-custo';
import { GrupoFinanceiro } from './grupo-financeiro';

export interface AgregadoFinanceiro {
    id?: number;
    name?: string;
    percentual?: number;
    centrocusto?: CentroCusto;
    grupoFinanceiro?: GrupoFinanceiro;

}
