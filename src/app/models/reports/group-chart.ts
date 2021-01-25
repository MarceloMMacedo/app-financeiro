import { SerieChart } from './serie-chart';

export interface GroupChart {
    name?: string;
    series?: SerieChart[];
    totalAberto?: number;
    totalQuit?: number;
}
