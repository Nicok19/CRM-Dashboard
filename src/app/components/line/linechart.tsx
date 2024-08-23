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
import LineChartPopup from './linechartPopup';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  darkMode: boolean;
}

const LineChart: FC<LineChartProps> = ({ darkMode }) => {
  const [title, setTitle] = useState('Line Chart Data');
  const [data, setData] = useState<ChartData<'line', number[]>>({
    labels: ['Data 1', 'Data 2', 'Data3', 'Data 4', 'Data 5'],
    datasets: [
      {
        label: 'Title',
        data: [30, 45, 60, 50, 70, 90, 100],
        borderColor: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(75, 192, 192, 1)',
        backgroundColor: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(75, 192, 192, 1)',
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
        color: darkMode ? 'white' : 'black', 
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
          label: function (tooltipItem: TooltipItem<'line'>) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
        titleColor: darkMode ? 'white' : 'black', 
        bodyColor: darkMode ? 'white' : 'black', 
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
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
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
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
      },
    },
  };

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



