import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const chartComponents = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
};

const CustomChart = ({ type = 'bar', data, options, plugins = [], height, width }) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedOptions = useMemo(() => options, [options]);

  const ChartComponent = chartComponents[type];
  
  if (!ChartComponent) {
    console.error(`Chart type "${type}" not supported`);
    return null;
  }

  return (
    <div style={{ height: height || '100%', width: width || '100%' }}>
      <ChartComponent 
        data={memoizedData} 
        options={memoizedOptions}
        plugins={plugins}
      />
    </div>
  );
};

export default CustomChart;