
import { Pessoa } from './pessoa';

export interface Endereco {
	id?: number;
	street?: string;
	zipCode?: string;
	bairro?: string;
	city?: string;
	nro?: string;
	complement?: string;
	state?: string;
	descricao?: string;
}
