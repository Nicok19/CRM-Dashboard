import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions, ArcElement, Title, Legend } from 'chart.js';
import PieChartPopup from './piechartPopup';
import { Chart } from 'chart.js';

// Register necessary elements
Chart.register(ArcElement, Title, Legend);

const PieChart: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [data, setData] = useState<ChartData<'pie', number[]>>({
    labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
    datasets: [
      {
        label: 'Pie Chart Data',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: darkMode
          ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)']
          : ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: darkMode
          ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
          : ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);

  // Update chart options based on dark mode
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: data.datasets[0].label,
        font: {
          size: 20,
          family: 'Arial',
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: darkMode ? '#FFFFFF' : '#000000', // Change title color based on dark mode
      },
      legend: {
        labels: {
          color: darkMode ? '#FFFFFF' : '#000000', // Change legend label color based on dark mode
        },
      },
    },
  };

  // Update data colors based on dark mode
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          backgroundColor: darkMode
            ? ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)']
            : ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: darkMode
            ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
            : ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        },
      ],
    }));
  }, [darkMode]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-gray-800 dark:hover:bg-teal-400 dark:hover:text-white text-white font-bold py-2 px-4 rounded mb-10 mt-20 transition-colors duration-300"

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

