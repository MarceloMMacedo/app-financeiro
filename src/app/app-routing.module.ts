import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { ListFuncionarioComponent } from './pages/pessoa/funcionario/list-funcionario/list-funcionario.component';
import { EditFuncionarioComponent } from './pages/pessoa/funcionario/edit-funcionario/edit-funcionario.component';
import { ListPatrimoniosComponent } from './pages/patrimonios/list-patrimonios/list-patrimonios.component';
import { EditPatrimonioComponent } from './pages/patrimonios/edit-patrimonio/edit-patrimonio.component';
import { RemovePatrimonioComponent } from './pages/patrimonios/remove-patrimonio/remove-patrimonio.component';
//import { CompanyComponent } from './pages/company/company.component';
import { ListClienteComponent } from './pages/pessoa/cliente/list-cliente/list-cliente.component';
import { EditClienteComponent } from './pages/pessoa/cliente/edit-cliente/edit-cliente.component';
import { ListParceiroComponent } from './pages/pessoa/parceiro/list-parceiro/list-parceiro.component';
import { EditParceiroComponent } from './pages/pessoa/parceiro/edit-parceiro/edit-parceiro.component';
import { ListFornecedorComponent } from './pages/pessoa/fornecedor/list-fornecedor/list-fornecedor.component';
import { EditFornecedorComponent } from './pages/pessoa/fornecedor/edit-fornecedor/edit-fornecedor.component';
import { ListBancomovimentoComponent } from './pages/bancomovimento/list-bancomovimento/list-bancomovimento.component';
import { EditBancomovimentoComponent } from './pages/bancomovimento/edit-bancomovimento/edit-bancomovimento.component';
import { ListContratoComponent } from './pages/contrato/list-contrato/list-contrato.component';
import { EditContratoComponent } from './pages/contrato/edit-contrato/edit-contrato.component';
 import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { CompanyComponent } from './pages/empresa/company/company.component';
import { ListCentroCustoComponent } from './pages/centrocusto/list-centro-custo/list-centro-custo.component';
import { EditCentroCustoComponent } from './pages/centrocusto/edit-centro-custo/edit-centro-custo.component';
import { HistoricosaidapadraoComponent } from './pages/historicopadraosaida/list-historicosaidapadrao/historicosaidapadrao.component';
import { EditHistoricosaidapadraoComponent } from './pages/historicopadraosaida/edit-historicosaidapadrao/edit-historicosaidapadrao.component';
import { ListGrupoContratoComponent } from './pages/grupofinanceirocontrato/list-grupo-contrato/list-grupo-contrato.component';
import { EditGrupoContratoComponent } from './pages/grupofinanceirocontrato/edit-grupo-contrato/edit-grupo-contrato.component';
import { ListGrupoanuncioComponent } from './pages/grupofinanceiroanuncio/list-grupoanuncio/list-grupoanuncio.component';
import { EditGrupoanuncioComponent } from './pages/grupofinanceiroanuncio/edit-grupoanuncio/edit-grupoanuncio.component';
import { ContasPagarReceberComponent } from './pages/movimentacaofinanceira/contas-pagar-receber/contas-pagar-receber.component';

import { ResumoContasPagarComponent } from './pages/movimentacaofinanceira/contaspagar/resumo-contas-pagar/resumo-contas-pagar.component';
import { NovoContratoComponent } from './pages/contrato/novo-contrato/novo-contrato.component';
import { QuitarFaturaSaidaComponent } from './pages/movimentacaofinanceira/contaspagar/quitar-fatura-saida/quitar-fatura-saida.component';
import { ListGruposervicosComponent } from './pages/grupofinanceiroservicos/list-gruposervicos/list-gruposervicos.component';
import { EditGruposervicosComponent } from './pages/grupofinanceiroservicos/edit-gruposervicos/edit-gruposervicos.component';
import { ResumoContasrecebercontratoComponent } from './pages/movimentacaofinanceira/contasrecebercontrato/resumo-contasrecebercontrato/resumo-contasrecebercontrato.component';
import { QuitarFaturaContratoComponent } from './pages/movimentacaofinanceira/contasrecebercontrato/quitar-fatura-contrato/quitar-fatura-contrato.component';
import { EditContaPagarComponent } from './pages/movimentacaofinanceira/contaspagar/edit-conta-pagar/edit-conta-pagar.component';
import { NewContaPagarComponent } from './pages/movimentacaofinanceira/contaspagar/new-conta-pagar/new-conta-pagar.component';
import { DemonstrativoAtualComponent } from './pages/report/demonstrativo-atual/demonstrativo-atual.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'funcionarios', component: ListFuncionarioComponent },
      { path: 'funcionarios/:id', component: EditFuncionarioComponent },
      { path: 'patrimonios', component: ListPatrimoniosComponent },
      { path: 'patrimonios/:id', component: EditPatrimonioComponent },
      { path: 'patrimonios/remove/:id', component: RemovePatrimonioComponent },
      { path: 'empresa', component: ListEmpresasComponent },
      { path: 'empresa/:id', component: CompanyComponent },
      { path: 'clientes', component: ListClienteComponent },
      { path: 'clientes/:id', component: EditClienteComponent },
      { path: 'parceiros', component: ListParceiroComponent },
      { path: 'parceiros/:id', component: EditParceiroComponent },

      { path: 'fornecedores', component: ListFornecedorComponent },
      { path: 'fornecedores/:id', component: EditFornecedorComponent },

      { path: 'bancomovimento', component: ListBancomovimentoComponent },
      { path: 'bancomovimento/:id', component: EditBancomovimentoComponent },

      { path: 'contratos', component: ListContratoComponent },
      { path: 'contratos/:id', component: EditContratoComponent },
      { path: 'novocontratos/:id', component: NovoContratoComponent },

      { path: 'centrocustos', component: ListCentroCustoComponent },
      { path: 'centrocustos/:id', component: EditCentroCustoComponent },

      { path: 'historicosaida', component: HistoricosaidapadraoComponent },
      { path: 'historicosaida/:id', component: EditHistoricosaidapadraoComponent },

      { path: 'grupocontrato', component: ListGrupoContratoComponent },
      { path: 'grupocontrato/:id', component: EditGrupoContratoComponent },

      { path: 'grupoanuncio', component: ListGrupoanuncioComponent },
      { path: 'grupoanuncio/:id', component: EditGrupoanuncioComponent},

      { path: 'index', component: ContasPagarReceberComponent },

      { path: 'resumocontaspagar/:id', component: ResumoContasPagarComponent},

      { path: 'quitarcontaspagar/:exercicio/:id', component: QuitarFaturaSaidaComponent},

      { path: 'contaspagar', component: NewContaPagarComponent},
      { path: 'contaspagar/:exercicio/:id', component: EditContaPagarComponent},

      { path: 'gruposervico', component: ListGruposervicosComponent },
      { path: 'gruposervico/:id', component: EditGruposervicosComponent},


      { path: 'resumocontasrecebercontrato/:id', component: ResumoContasrecebercontratoComponent},

      { path: 'quitarcontasrecebercontrato/:exercicio/:id', component: QuitarFaturaContratoComponent},

      { path: 'demonstrativoatual', component: DemonstrativoAtualComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
