//在此添加用到的echarts模块
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, TitleComponent, LegendComponent, TooltipComponent, BarChart, CanvasRenderer]);

export default echarts;
