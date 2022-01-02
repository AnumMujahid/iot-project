import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ dataSet, labelSet, text }) => {
  const labels = labelSet;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataSet,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
