import { FC, useState } from 'react';
import { ChartData } from 'chart.js';

interface BarChartPopupProps {
  onClose: () => void;
  data: ChartData<'bar', number[]>;
  setData: React.Dispatch<React.SetStateAction<ChartData<'bar', number[]>>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const BarChartPopup: FC<BarChartPopupProps> = ({ onClose, data, setData, title, setTitle }) => {
  const [inputs, setInputs] = useState<Array<{ label: string; value: number }>>(
    (data.labels as string[] || []).map((label, index) => ({
      label: label ?? '',  
      value: data.datasets[0].data[index] || 0,
    })) || [
      { label: 'Label 1', value: 10 },
      { label: 'Label 2', value: 20 },
      { label: 'Label 3', value: 30 },
      { label: 'Label 4', value: 40 },
    ]
  );

  const handleAddInput = () => {
    setInputs([...inputs, { label: '', value: 0 }]);
  };

  const handleRemoveInput = (index: number) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (index: number, field: 'label' | 'value', value: string | number) => {
    const updatedInputs = inputs.map((input, i) =>
      i === index ? { ...input, [field]: value } : input
    );
    setInputs(updatedInputs);
  };

  const handleSave = () => {
    const newLabels = inputs.map(input => input.label);
    const newChartData = inputs.map(input => input.value);
    setData({
      ...data,
      labels: newLabels,
      datasets: [{ ...data.datasets[0], label: title, data: newChartData }],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Edit Bar Chart Data</h2>
        
        <p className="mb-8 text-lg sm:text-xl text-white font-medium">Enter the label and data pairs.</p>
        
        <label className="block mb-4 text-white">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full text-gray-800"
          />
        </label>
        
        {inputs.map((input, index) => (
          <div key={index} className="mb-4 flex">
            <label className="block mb-1 text-gray-800">
              Label:
              <input
                type="text"
                value={input.label}
                onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                className="border rounded text-slate-800 p-2 w-48 mr-2"
              />
            </label>
            <label className="block mb-1 text-gray-800">
              Data:
              <input
                type="number"
                value={input.value}
                onChange={(e) => handleInputChange(index, 'value', Number(e.target.value))}
                className="border rounded text-slate-800 p-2 w-11/12 mr-2"
              />
            </label>
            {inputs.length > 1 && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveInput(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-1/2 mb-4"
          onClick={handleAddInput}
        >
          Add Label/Data Pair
        </button>

        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded  sm:w-1/2 h-10"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded sm:w-1/2 h-10"
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


