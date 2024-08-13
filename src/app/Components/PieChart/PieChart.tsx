import { FC, useState, useEffect, useMemo } from 'react';
import { ChartData, ChartOptions, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PieChartPopup from './PieChartPopup';
import { Chart } from 'chart.js';

// Register ArcElement for Pie charts
Chart.register(ArcElement);

const PieChart: FC = () => {
  const [data, setData] = useState<ChartData<'pie', number[]>>({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Pie Chart Example', // Initial title
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [], // Initially empty
        borderColor: [],     // Initially empty
        borderWidth: 1,
      },
    ],
  });

  // State to detect dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Memoize colors based on the mode
  const backgroundColors = useMemo(() => 
    isDarkMode
      ? [
          'rgba(0, 204, 255, 0.8)', // Dark mode colors
          'rgba(255, 105, 180, 0.8)',
          'rgba(255, 69, 0, 0.8)',
          'rgba(50, 205, 50, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(255, 140, 0, 0.8)',
        ]
      : [
          'rgba(0, 123, 255, 0.8)', // Light mode colors
          'rgba(255, 193, 7, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(23, 162, 184, 0.8)',
          'rgba(108, 117, 125, 0.8)',
          'rgba(255, 87, 34, 0.8)',
        ],
  [isDarkMode]);

  const borderColors = useMemo(() => 
    isDarkMode
      ? [
          'rgba(0, 204, 55, 1)', // Dark mode border colors
          'rgba(255, 105, 180, 1)',
          'rgba(255, 69, 0, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 140, 0, 1)',
        ]
      : [
          'rgba(0, 123, 255, 1)', // Light mode border colors
          'rgba(255, 193, 7, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(23, 162, 184, 1)',
          'rgba(108, 117, 125, 1)',
          'rgba(255, 87, 34, 1)',
        ],
  [isDarkMode]);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    layout: {
      padding: 20, // Adjust padding to control chart size
    },
  };

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          backgroundColor: backgroundColors,
          borderColor: borderColors,
        },
      ],
    }));
  }, [backgroundColors, borderColors]);

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <h2 className="text-center text-xl mb-4">{data.datasets[0].label}</h2> {/* Display chart title */}
      <Pie data={data} options={options} />
      <button 
        className="bg-blue-500 hover:bg-blue-700  dark:bg-white dark:text-gray-800 text-white font-bold py-2 px-4 rounded" 
        onClick={() => setShowPopup(true)}
      >
        Edit Data
      </button>
      {showPopup && (
        <PieChartPopup 
          onClose={() => setShowPopup(false)} 
          data={data} 
          setData={setData} 
        />
      )}
    </div>
  );
};

export default PieChart;
