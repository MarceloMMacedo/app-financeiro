import { Patrimonio } from './patrimonio';

export interface EquipamentoContrato {
    equipamento?: Patrimonio;
    setor?: string;
    responsavel?: string;
    valorfranquia?: number;
    franquia?: number;
    valor?: number;
}
