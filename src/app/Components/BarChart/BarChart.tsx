import { FC, useState, useMemo } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  darkMode: boolean;
}

const BarChart: FC<BarChartProps> = ({ darkMode }) => {
  const [title, setTitle] = useState('Bar Chart Data');
  const [data, setData] = useState<ChartData<'bar', number[]>>({
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Title',
        data: [50, 60, 70, 80, 90, 100, 110],
        backgroundColor: darkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        borderColor: darkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: darkMode ? 'white' : 'black',
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: darkMode ? 'white' : 'black',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'bar'>) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
        bodyColor: darkMode ? 'white' : 'black',
        titleColor: darkMode ? 'white' : 'black',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Labels',
          color: darkMode ? 'white' : 'black',
        },
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Data',
          color: darkMode ? 'white' : 'black',
        },
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
      },
    },
  }), [darkMode, title]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative">
      <button
       className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-gray-800 dark:hover:bg-teal-400 dark:hover:text-white text-white font-bold py-2 px-4 rounded mb-10 mt-20 transition-colors duration-300"
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
        <Bar data={data} options={options} />
      </div>

      {isPopupOpen && (
        <BarChartPopup
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

export default BarChart;





