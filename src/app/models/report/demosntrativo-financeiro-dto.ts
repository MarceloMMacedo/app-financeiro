import { ItemDemosntrativoFinanceiroDto } from './item-demosntrativo-financeiro-dto';

export interface DemosntrativoFinanceiroDto {
  exercicio?: number;
  mes?: number;
  entradarealizados?: ItemDemosntrativoFinanceiroDto[];
  entradasFuturo?: ItemDemosntrativoFinanceiroDto[];
  saidarealizados?: ItemDemosntrativoFinanceiroDto[];
  saidasFuturo?: ItemDemosntrativoFinanceiroDto[];
  movimentosAberto?: ItemDemosntrativoFinanceiroDto[];

  estradasRealizadas?: number;
  estradasFuturas?: number;
  saidasRealizadas?: number;
  saidasFuturas?: number;

  faturamentosRealizadas?: number;
  faturamentosFuturas?: number;

  saldo?: number;
}
