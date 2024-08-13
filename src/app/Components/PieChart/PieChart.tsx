import React, { useState, useEffect, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions, ArcElement, Title, Legend } from 'chart.js';
import PieChartPopup from './PieChartPopup';
import { Chart } from 'chart.js';

// Register necessary elements
Chart.register(ArcElement, Title, Legend);

const PieChart: React.FC = () => {
  const [data, setData] = useState<ChartData<'pie', number[]>>({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Pie Chart Example',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [], // To be set based on mode
        borderColor: [],     // To be set based on mode
        borderWidth: 1,
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode changes
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

  // Define colors based on mode
  const backgroundColors = useMemo(() =>
    isDarkMode
      ? [
          'rgba(68, 221, 176, 1)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ]
      : [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
  [isDarkMode]);

  const borderColors = useMemo(() =>
    isDarkMode
      ? [
          'rgba(68, 221, 176, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ]
      : [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
  [isDarkMode]);

  // Define title and label color based on mode
  const titleColor = useMemo(() => (isDarkMode ? '#ffffff' : '#000000'), [isDarkMode]);
  const labelColor = useMemo(() => (isDarkMode ? '#ffffff' : '#000000'), [isDarkMode]);

  // Update data colors based on mode
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

  // Define chart options
  const options: ChartOptions<'pie'> = {
    plugins: {
      title: {
        display: true,
        text: 'Pie Chart Example',
        font: {
          size: 20, // Match the LineChart font size
          family: 'Arial',
          weight: 'bold', // Match the LineChart font weight
        },
        color: titleColor, // Set title color based on mode
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        labels: {
          color: labelColor, // Set label color here
        },
      },
    },
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-gray-800 text-white font-bold py-2 px-4 rounded mb-10"
        onClick={() => setShowPopup(true)}
      >
        Edit Data
      </button>
      <Pie data={data} options={options} />
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

