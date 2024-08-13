import { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
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
    maintainAspectRatio: false, // Permitir ajustar el tamaño del gráfico
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
        className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-gray-800 text-white font-bold py-2 px-4 rounded mb-10 mt-20"
        onClick={() => setIsPopupOpen(true)}
      >
        Edit Data
      </button>

      {/* Aumentar el tamaño del gráfico según los breakpoints de Tailwind */}
      <div
        className="
          w-[350px] h-[200px]          /* Default size */
          sm:w-[600px] sm:h-[300px]     /* Small screens */
          md:w-[800px] md:h-[350px]     /* Medium screens */
          lg:w-[500px] lg:h-[300px]     /* Large screens */
          xl:w-600px] xl:h-[350px]     /* Extra large screens */
          2xl:w-[800px] 2xl:h-[500px]   /* 2XL screens */
        "
      >
        <Bar data={data} options={options} />
      </div>

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


