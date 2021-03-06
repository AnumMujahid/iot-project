import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dataSet, labelSet, text }) => {
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
  const labels = labelSet;
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataSet,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
  };
  return (
    <div>
      {console.log(dataSet)}
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
