import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NZ_ICONS } from 'ng-zorro-antd/icon';

import { LOCALE_ID, NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { ComponenteGeral } from './componente.geral';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AccountService } from './account/shared/account.service';
import { AuthInterceptor } from './account/shared/auth-interceptor.service';
import { AuthGuard } from './account/shared/auth.guard';
import { StorageService } from './services/storage.service';
import { EmpresaService } from './services/empresa.service';
import { FuncionarioService } from './services/funcionario.service';
import { ErrorInterceptor } from './account/shared/error-interceptor.service';
import { ListFuncionarioComponent } from './pages/pessoa/funcionario/list-funcionario/list-funcionario.component';
import { EditFuncionarioComponent } from './pages/pessoa/funcionario/edit-funcionario/edit-funcionario.component';
import { PreCadastroComponent } from './pages/pessoa/funcionario/pre-cadastro/pre-cadastro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxCurrencyModule } from "ngx-currency";
//import { CurrencyMaskModule } from "ngx-currency-mask";
import { EmpresaComponent } from './pages/pessoa/empresa/empresa.component';
import { ListPatrimoniosComponent } from './pages/patrimonios/list-patrimonios/list-patrimonios.component';
import { EditPatrimonioComponent } from './pages/patrimonios/edit-patrimonio/edit-patrimonio.component';
import { RemovePatrimonioComponent } from './pages/patrimonios/remove-patrimonio/remove-patrimonio.component';

import { PatrimoniosService } from './services/patrimonios.service';
import { EditClienteComponent } from './pages/pessoa/cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './pages/pessoa/cliente/list-cliente/list-cliente.component';
import { ListParceiroComponent } from './pages/pessoa/parceiro/list-parceiro/list-parceiro.component';
import { EditParceiroComponent } from './pages/pessoa/parceiro/edit-parceiro/edit-parceiro.component';
import { ListFornecedorComponent } from './pages/pessoa/fornecedor/list-fornecedor/list-fornecedor.component';
import { EditFornecedorComponent } from './pages/pessoa/fornecedor/edit-fornecedor/edit-fornecedor.component';
import { ListBancomovimentoComponent } from './pages/bancomovimento/list-bancomovimento/list-bancomovimento.component';
import { EditBancomovimentoComponent } from './pages/bancomovimento/edit-bancomovimento/edit-bancomovimento.component';
import { ListContratoComponent } from './pages/contrato/list-contrato/list-contrato.component';
import { EditContratoComponent } from './pages/contrato/edit-contrato/edit-contrato.component';
import { PrinContratoComponent } from './pages/contrato/prin-contrato/prin-contrato.component';

import { FormsModule } from '@angular/forms';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ContareceberContratoComponent } from './pages/movimentacaofinanceira/contareceber-contrato/contareceber-contrato.component';
 import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { CompanyComponent } from './pages/empresa/company/company.component';
import { ListCentroCustoComponent } from './pages/centrocusto/list-centro-custo/list-centro-custo.component';
import { EditCentroCustoComponent } from './pages/centrocusto/edit-centro-custo/edit-centro-custo.component';
import { HistoricosaidapadraoComponent } from './pages/historicopadraosaida/list-historicosaidapadrao/historicosaidapadrao.component';
import { EditHistoricosaidapadraoComponent } from './pages/historicopadraosaida/edit-historicosaidapadrao/edit-historicosaidapadrao.component';
import { ListGrupoContratoComponent } from './pages/grupofinanceirocontrato/list-grupo-contrato/list-grupo-contrato.component';
import { EditGrupoContratoComponent } from './pages/grupofinanceirocontrato/edit-grupo-contrato/edit-grupo-contrato.component';
import { EditAgregadoContratoComponent } from './pages/grupofinanceirocontrato/edit-agregado-contrato/edit-agregado-contrato.component';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ListGrupoanuncioComponent } from './pages/grupofinanceiroanuncio/list-grupoanuncio/list-grupoanuncio.component';
import { EditGrupoanuncioComponent } from './pages/grupofinanceiroanuncio/edit-grupoanuncio/edit-grupoanuncio.component';

import * as $ from 'jquery';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NovoContratoComponent } from './pages/contrato/novo-contrato/novo-contrato.component';
import { ContasPagarReceberComponent } from './pages/movimentacaofinanceira/contas-pagar-receber/contas-pagar-receber.component';
import { ResumoContasPagarComponent } from './pages/movimentacaofinanceira/contaspagar/resumo-contas-pagar/resumo-contas-pagar.component';
import { PrintResumoComponent } from './pages/movimentacaofinanceira/contaspagar/print-resumo/print-resumo.component';
import { QuitarFaturaSaidaComponent } from './pages/movimentacaofinanceira/contaspagar/quitar-fatura-saida/quitar-fatura-saida.component';
import { ListGruposervicosComponent } from './pages/grupofinanceiroservicos/list-gruposervicos/list-gruposervicos.component';
import { EditGruposervicosComponent } from './pages/grupofinanceiroservicos/edit-gruposervicos/edit-gruposervicos.component';
import { EditAgregadoServicoComponent } from './pages/grupofinanceiroservicos/edit-agregado-servico/edit-agregado-servico.component';
import { QuitarFaturaContratoComponent } from './pages/movimentacaofinanceira/contasrecebercontrato/quitar-fatura-contrato/quitar-fatura-contrato.component';
import { ResumoContasrecebercontratoComponent } from './pages/movimentacaofinanceira/contasrecebercontrato/resumo-contasrecebercontrato/resumo-contasrecebercontrato.component';
import { NewContaPagarComponent } from './pages/movimentacaofinanceira/contaspagar/new-conta-pagar/new-conta-pagar.component';
import { EditContaPagarComponent } from './pages/movimentacaofinanceira/contaspagar/edit-conta-pagar/edit-conta-pagar.component';
import { IndexDemostrativoComponent } from './pages/demonstrativofinanceiro/index-demostrativo/index-demostrativo.component';
import { DemonstrativoAtualComponent } from './pages/report/demonstrativo-atual/demonstrativo-atual.component';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
registerLocaleData(pt);

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    LoginComponent,
    ListFuncionarioComponent,
    EditFuncionarioComponent,
    PreCadastroComponent,
    EmpresaComponent,
    ListPatrimoniosComponent,
    EditPatrimonioComponent,
    RemovePatrimonioComponent,
    CompanyComponent,
    ListClienteComponent,
    EditClienteComponent,
    ListParceiroComponent,
    EditParceiroComponent,
    ListFornecedorComponent,
    EditFornecedorComponent,
    ListBancomovimentoComponent,
    EditBancomovimentoComponent,
    ListContratoComponent,
    EditContratoComponent,
    PrinContratoComponent,
    ContareceberContratoComponent,
    ListEmpresasComponent, ListCentroCustoComponent, EditCentroCustoComponent,
    HistoricosaidapadraoComponent,
    EditHistoricosaidapadraoComponent,
    ListGrupoContratoComponent,
    EditGrupoContratoComponent,
    EditAgregadoContratoComponent,
    ListGrupoanuncioComponent,
    EditGrupoanuncioComponent,
    ContasPagarReceberComponent,
    ResumoContasPagarComponent,
    NovoContratoComponent,
    PrintResumoComponent,
    QuitarFaturaSaidaComponent,
    ListGruposervicosComponent,
    EditGruposervicosComponent,
    EditAgregadoServicoComponent,
    QuitarFaturaContratoComponent,
    ResumoContasrecebercontratoComponent,
    NewContaPagarComponent,
    EditContaPagarComponent,
    IndexDemostrativoComponent,
    DemonstrativoAtualComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ComponenteGeral,
    NgxSpinnerModule, NgbModule,
    NzPaginationModule,
    NgxCurrencyModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxChartsModule,
    FullCalendarModule

  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR },
  { provide: NZ_ICONS, useValue: icons },
  { provide: LOCALE_ID, useValue: "pt_BR" },
    AccountService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    StorageService,
    EmpresaService,
    FuncionarioService,
    PatrimoniosService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
