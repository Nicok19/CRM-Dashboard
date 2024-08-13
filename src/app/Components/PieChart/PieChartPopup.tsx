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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 shadow-2xl rounded-lg w-full h-full p-4">
      <div className="relative bg-slate-800 p-6 rounded shadow-lg
        w-full max-w-xs /* Small screens */
        sm:max-w-sm /* Small screens (sm) */
        md:max-w-md /* Medium screens (md) */
        lg:max-w-lg /* Large screens (lg) */
        xl:max-w-xl /* Extra large screens (xl) */
        2xl:max-w-2xl /* 2XL screens (2xl) */
        mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">Edit Chart Data</h2>
        <p className='mb-8 text-lg sm:text-xl text-white font-medium'>Enter the data and labels separated by slashes (/).</p>

        <label className="block mb-2 text-white text-sm sm:text-base">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="border rounded text-slate-800 p-2 mt-1 w-full"
          />
        </label>

        <label className="block mb-2 text-white text-sm sm:text-base">
          Labels:
          <input
            type="text"
            value={labels.length > 0 ? labels.join(' / ') : ''}
            onChange={handleLabelsChange}
            placeholder="Enter labels separated by /"
            className="border rounded text-slate-800 p-2 mt-1 w-full"
          />
        </label>

        <label className="block mb-2 text-white text-sm sm:text-base">
          Data:
          <input
            type="text"
            value={chartData.length > 0 ? chartData.join(' / ') : ''}
            onChange={handleDataChange}
            placeholder="Enter data separated by /"
            className="border rounded text-slate-800 p-2 mt-1 w-full"
          />
        </label>

        <p className="text-red-500 text-center mb-4 text-sm sm:text-base">
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

        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 h-10 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 h-10"
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







