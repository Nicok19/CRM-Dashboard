import { FC, useState } from 'react';
import { ChartData } from 'chart.js';

interface PopupProps {
  onClose: () => void;
  data: ChartData<'pie', number[]>;
  setData: React.Dispatch<React.SetStateAction<ChartData<'pie', number[]>>>;
}

const PieChartPopup: FC<PopupProps> = ({ onClose, data, setData }) => {
  const [title, setTitle] = useState(data.datasets[0].label || '');
  const [labels, setLabels] = useState(data.labels || []);
  const [chartData, setChartData] = useState(data.datasets[0].data || []);

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabels = e.target.value.split('/').map(label => label.trim()).filter(Boolean);
    setLabels(newLabels);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value.split('/').map(value => Number(value.trim())).filter(value => !isNaN(value) && value >= 1);
    setChartData(newData);
  };

  const handleSave = () => {
    if (isFormValid) {
      setData({
        ...data,
        labels,
        datasets: [{ ...data.datasets[0], label: title, data: chartData }],
      });
      onClose();
    }
  };

  const hasValidData = chartData.every((value) => value >= 1);
  const isLabelDataCountMatch = labels.length === chartData.length;
  const isFormValid = labels.length > 0 && chartData.length > 0 && hasValidData && isLabelDataCountMatch;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-900 bg-opacity-80 shadow-2xl rounded-lg w-full h-full">
      <div className="relative bg-slate-800 p-6 rounded shadow-lg w-2/3">
        <h2 className="text-2xl font-bold mb-8 text-white">Edit Chart Data</h2>
        <p className='mb-10 text-xl text-white font-medium'>Enter the data and labels separated by slashes (/).</p>

        <label className="block mb-2 text-white">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="border rounded text-slate-800 p-2 ml-5 w-5/6"
          />
        </label>

        <label className="block mb-2 text-white">
          Labels:
          <input
            type="text"
            value={labels.length > 0 ? labels.join(' / ') : ''}
            onChange={handleLabelsChange}
            placeholder="Enter labels separated by /"
            className="border rounded text-slate-800 p-2 ml-5 w-5/6"
          />
        </label>

        <label className="block mb-2 text-white">
          Data:
          <input
            type="text"
            value={chartData.length > 0 ? chartData.join(' / ') : ''}
            onChange={handleDataChange}
            placeholder="Enter data separated by /"
            className="border rounded text-slate-800 p-2 ml-5 w-5/6"
          />
        </label>

        <p className="text-red-500 text-center mb-4">
          {!isFormValid && (
            labels.length === 0 || chartData.length === 0 ? (
              "At least one label and one data point are required."
            ) : !isLabelDataCountMatch ? (
              "The number of labels must match the number of data points."
            ) : (
              "All data points must be greater than or equal to 1."
            )
          )}
        </p>

        <div className="mt-12 flex flex-row justify-center space-x-5">
          <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-2/6 h-10 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-2/6 h-10"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieChartPopup;






