export interface Resumocontas {
    id?: number;
    historico?: string;
    listahst?:Resumocontas[];
    exercicio?: number;
    saldoanterior?: number;
    saldoExercioAtual?: number;
    saldoexercicioPosterior?: number;
    total?: number;
    jan?: number;
    fev?: number;
    mar?: number;
    abl?: number;
    mai?: number;
    jun?: number;
    jul?: number;
    ago?: number;
    set?: number;
    out?: number;
    nov?: number;
    dez?: number;
}
