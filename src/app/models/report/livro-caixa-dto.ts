import { ItemDemosntrativoFinanceiroDto } from './item-demosntrativo-financeiro-dto';

export interface LivroCaixaDto {
  movimentos?: ItemDemosntrativoFinanceiroDto[];
  datainicio?: Date;
  datafim?: Date;
  totaisEntrada?: number;
  totaisSaida?: number;
  total?: number;
}
