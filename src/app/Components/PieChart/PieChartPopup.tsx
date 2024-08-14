import { FC, useState, useEffect } from 'react';
import { ChartData } from 'chart.js';

interface PopupProps {
  onClose: () => void;
  data: ChartData<'pie', number[]>;
  setData: React.Dispatch<React.SetStateAction<ChartData<'pie', number[]>>>;
}

const PieChartPopup: FC<PopupProps> = ({ onClose, data, setData }) => {
  const [title, setTitle] = useState(data.datasets[0].label || '');
  const [inputPairs, setInputPairs] = useState<{ label: string, value: string }[]>([]);

  useEffect(() => {
    // Initialize inputPairs with existing data
    const initialInputPairs = (data.labels || []).map((label, index) => ({
      label: String(label),
      value: String(data.datasets[0].data[index] || '')
    }));
    setInputPairs(initialInputPairs);
  }, [data]);

  const handleInputChange = (index: number, type: 'label' | 'value', value: string) => {
    const newInputPairs = [...inputPairs];
    newInputPairs[index][type] = value;
    setInputPairs(newInputPairs);
  };

  const handleAddInput = () => {
    setInputPairs([...inputPairs, { label: '', value: '' }]);
  };

  const handleRemoveInput = (index: number) => {
    if (inputPairs.length > 1) {
      setInputPairs(inputPairs.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    const labels = inputPairs.map(pair => pair.label.trim()).filter(Boolean);
    const chartData = inputPairs.map(pair => Number(pair.value.trim())).filter(value => !isNaN(value) && value >= 1);

    if (isFormValid(labels, chartData)) {
      setData({
        ...data,
        labels,
        datasets: [{ ...data.datasets[0], label: title, data: chartData }],
      });
      onClose();
    }
  };

  const isFormValid = (labels: string[], chartData: number[]) => {
    const hasValidData = chartData.every((value) => value >= 1);
    const isLabelDataCountMatch = labels.length === chartData.length;
    return labels.length > 0 && chartData.length > 0 && hasValidData && isLabelDataCountMatch;
  };

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
        <p className='mb-8 text-lg sm:text-xl text-white font-medium'>Enter the label and data pairs.</p>

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

        {inputPairs.map((pair, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              value={pair.label}
              onChange={(e) => handleInputChange(index, 'label', e.target.value)}
              placeholder="Label"
              className="border rounded text-slate-800 p-2 w-1/2 mr-2"
            />
            <input
              type="text"
              value={pair.value}
              onChange={(e) => handleInputChange(index, 'value', e.target.value)}
              placeholder="Data"
              className="border rounded text-slate-800 p-2 w-1/2 mr-2"
            />
            {inputPairs.length > 1 && (
              <button
                onClick={() => handleRemoveInput(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={handleAddInput}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 mb-4"
        >
          Add Label/Data Pair
        </button>

        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 h-10 ${!isFormValid(inputPairs.map(p => p.label), inputPairs.map(p => Number(p.value))) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handleSave}
            disabled={!isFormValid(inputPairs.map(p => p.label), inputPairs.map(p => Number(p.value)))}
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








