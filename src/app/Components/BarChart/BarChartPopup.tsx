import { FC, useState } from 'react';
import { ChartData } from 'chart.js';

interface PopupProps {
  onClose: () => void;
  data: ChartData<'bar', number[]>;
  setData: React.Dispatch<React.SetStateAction<ChartData<'bar', number[]>>>;
}

const BarChartPopup: FC<PopupProps> = ({ onClose, data, setData }) => {
  const [title, setTitle] = useState(data.datasets[0].label || '');
  const [labels, setLabels] = useState(data.labels || []);
  const [chartData, setChartData] = useState(data.datasets[0].data || []);

  const handleSave = () => {
    setData({
      ...data,
      labels,
      datasets: [{ ...data.datasets[0], label: title, data: chartData }],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-900 bg-opacity-80 shadow-2xl rounded-lg mt-16 w-full">
      <div className=" bg-slate-500 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-24 text-white">Edit Chart Data</h2>
        <label className="block mb-2">-
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 font-bold font-primary"
          />
        </label>
        <div>
        <label className="block mb-2">
          Labels:
          <input
            type="text"
            value={labels.join(',')}
            onChange={(e) => setLabels(e.target.value.split(',').filter(Boolean))}
            className="border rounded p-2"
          />
          
        </label>
        </div>
        <label className="block mb-2">
          Data:
          <input
            type="text"
            value={chartData.join(',')}
            onChange={(e) => setChartData(e.target.value.split(',').map(Number))}
            className="border rounded p-2 w-full"
          />
        </label>
        <div className="mt-4 flex flex-col justify-end space-y-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarChartPopup;
