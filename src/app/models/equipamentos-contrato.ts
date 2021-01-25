import { Patrimonio } from './patrimonio';
import { Contrato } from './contrato';
export interface EquipamentosContrato {
    id?: number;
    name?: string;
    equipamento?: Patrimonio;
    contrato?: Contrato;
    franquia?: number;
    valorfranquia?: number;
    valortotal?: number;
    setor?:string;
}
