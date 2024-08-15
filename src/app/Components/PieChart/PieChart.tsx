import React, { useState } from 'react';
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
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);

  // Define chart options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: data.datasets[0].label, // Use the label from dataset for the title
        font: {
          size: 20, // Match the LineChart font size
          family: 'Arial',
          weight: 'bold', // Match the LineChart font weight
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        labels: {
          color: '#000000', // Default label color
        },
      },
    },
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-gray-800 text-white font-bold py-2 px-4 rounded mb-10 mt-20"
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



