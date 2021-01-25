import { Modelo } from './modelo';
import { Pessoa } from './pessoa';






export interface Patrimonio {

  id?: number;
  name?: string;
  tipoPatrimonio?: string;
  modelo?: Modelo;
  codPatrimonio?: string;
  serial?: string;
  status?: string;
  dataAquisicao?: Date;
  medidorInstalacao?: number;
  madidorremocao?: number;
  medidorManutencao?: number;
  medidorContrato?: number;
  dataInstalacao?: Date;
  empresa?: Pessoa;
  avatar?: string;
  avatarView?: string;
  imagepatrimonio?: string;
  imagepatrimonioView?: string;
  statuslocacao?: string;
  dataInatividade?: Date;
  motivoDescarte?: string;
}
