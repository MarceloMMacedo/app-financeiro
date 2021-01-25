import { GroupChart } from './group-chart';

export interface ListGroupChart {
    grupoCharts?: GroupChart[];
    totalAberto?: number;
    totalAcumulado?: number;
    grupoQuit?: GroupChart;
    totalQuit?: number;
}
