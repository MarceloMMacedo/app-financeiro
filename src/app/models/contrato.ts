 
import { MovimentoFinanceiro } from './movimento-financeiro'; 
import { BaseDto } from './dto/base-dto';
import { EquipamentosContrato } from './equipamentos-contrato';
import { AgregadoFinanceiroDto } from './agregado-financeiro-dto';
import { GrupoFinanceiro } from './grupo-financeiro';

export interface Contrato {
    id?: number;
    name?: string;
    financeiroContrato?: GrupoFinanceiro;
    cliente?: BaseDto;
    datainicio?: Date;
    dataInstalacao?: Date;
    dataPrimeiroVencimento?: Date;
    periodo?: number;
    diaLeitura?: number;
    diaVencimento?: number;
    imageContrato?: string;
    isFranquia?: string;
    valor?: number;
    status?: string;
    movimentoFinanceiros?: MovimentoFinanceiro[];
    equipamentosContratos?: EquipamentosContrato[];
    movimentoFinanceirosAberto?: MovimentoFinanceiro;
    total?: number;
    imageContratoView?: string;
    valoresContrato?: AgregadoFinanceiroDto[];
    valorPorExtenso?: string;
    clientename?: string;
}
