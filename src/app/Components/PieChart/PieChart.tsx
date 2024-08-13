import { FC, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, ChartData, ChartOptions, TooltipItem, Filler } from 'chart.js';
import PieChartPopup from './PieChartPopup';

Chart.register(ArcElement, Filler);

const PieChart: FC = () => {
  const [data, setData] = useState<ChartData<'pie', number[]>>({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Pie Chart Example',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Pie Chart Example',
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
          label: function (tooltipItem: TooltipItem<'pie'>) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsPopupOpen(true)}
      >
        Edit Data
      </button>
      <Pie data={data} options={options} />
      {isPopupOpen && (
        <PieChartPopup
          data={data}
          setData={setData}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default PieChart;







