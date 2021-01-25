import { Resumocontas } from "./resumocontas";

export interface ResumoMovimentoFinaneiro {

	 resumoPagar?:Resumocontas[];

	 resumoReceberContrato?:Resumocontas[];

	 resumoReceberServico?:Resumocontas[];

	  events?:Event[]
}
