import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import LineChartPopup from './LineChartPopup';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: FC = () => {
  const [title, setTitle] = useState('Monthly Revenue Data');
  const [data, setData] = useState<ChartData<'line', number[]>>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [30, 45, 60, 50, 70, 90, 100],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  });

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
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
          label: function (tooltipItem: TooltipItem<'line'>) {
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
          text: 'Revenue',
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

      <div
        className="
          w-[350px] h-[200px]        
          sm:w-[600px] sm:h-[300px]     
          md:w-[800px] md:h-[350px]     
          lg:w-[500px] lg:h-[300px]    
          xl:w-[600px] xl:h-[350px]    
          2xl:w-[800px] 2xl:h-[500px]  
        "
      >
        <Line data={data} options={options} />
      </div>

      {isPopupOpen && (
        <LineChartPopup
          data={data}
          setData={setData}
          onClose={() => setIsPopupOpen(false)}
          title={title}
          setTitle={setTitle}
        />
      )}
    </div>
  );
};

export default LineChart;


