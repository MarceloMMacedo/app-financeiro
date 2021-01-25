import { ItemMesDemostrativoDTO } from "./item-mes-demostrativo-dto";

export interface ReportDemostrativoFinancerio {
   mes?:number;
	 exercicio?:number;
	 jan?:ItemMesDemostrativoDTO;
	 fev?:ItemMesDemostrativoDTO;
	 mar?:ItemMesDemostrativoDTO;
	 abr?:ItemMesDemostrativoDTO;
	 mai?:ItemMesDemostrativoDTO;
	 jun?:ItemMesDemostrativoDTO;
	 jul?:ItemMesDemostrativoDTO;
	 ago?:ItemMesDemostrativoDTO;
	 set?:ItemMesDemostrativoDTO;
	 out?:ItemMesDemostrativoDTO;
	 nov?:ItemMesDemostrativoDTO;
	 dez?:ItemMesDemostrativoDTO;
}
