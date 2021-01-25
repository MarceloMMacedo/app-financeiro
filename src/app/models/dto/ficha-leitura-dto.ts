export interface FichaLeituraDto {
  id?: number;
  descricao?: number;
  idfatura?: number;
  idequipamento?: number;
  modelo?: string;
  local?: string;
  franquia?: number;
  creditos?: number;
  valorfranquia?: number;
  serial?: string;
  dataleitura?: Date;
  dataprogramadaleitura?: Date;
  status?: string;
  medidorAtual?: number;
  medidorAnterior?: number;
  medidorFaturamento?: number;
  faturamentoExcedente?: number;
  valorExcedente?: number;

}
