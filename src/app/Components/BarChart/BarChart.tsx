import { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions, TooltipItem } from 'chart.js';
import BarChartPopup from './BarChartPopup';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: FC = () => {
  const [data, setData] = useState<ChartData<'bar', number[]>>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'bar'>) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
      },
    },
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700  dark:bg-white dark:text-gray-800 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsPopupOpen(true)}
      >
        Edit Data
      </button>
      <Bar data={data} options={options} />
      {isPopupOpen && (
        <BarChartPopup
          data={data}
          setData={setData}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default BarChart;
