import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PieChartPopup from '../src/app/components/PieChart/PieChartPopup';
import { ChartData } from 'chart.js';

describe('PieChartPopup', () => {
  const mockOnClose = jest.fn();
  const mockSetData = jest.fn();

  const mockData: ChartData<'pie', number[]> = {
    labels: ['Label 1', 'Label 2'],
    datasets: [
      {
        label: 'Test Chart',
        data: [10, 20],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  beforeEach(() => {
    render(<PieChartPopup onClose={mockOnClose} data={mockData} setData={mockSetData} />);
  });

  it('renders the popup with correct initial values', () => {
    expect(screen.getByText('Edit Chart Data')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Chart')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Label 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Label 2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  it('allows adding a new label/data pair', () => {
    fireEvent.click(screen.getByText('Add Label/Data Pair'));

    const labelInputs = screen.getAllByPlaceholderText('Label');
    const dataInputs = screen.getAllByPlaceholderText('Data');

    expect(labelInputs).toHaveLength(3);
    expect(dataInputs).toHaveLength(3);
  });

  it('allows removing a label/data pair', () => {
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    const labelInputs = screen.getAllByPlaceholderText('Label');
    const dataInputs = screen.getAllByPlaceholderText('Data');

    expect(labelInputs).toHaveLength(1);
    expect(dataInputs).toHaveLength(1);
  });

  it('does not allow removing the last label/data pair', () => {
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    fireEvent.click(removeButtons[1]);

    const labelInputs = screen.getAllByPlaceholderText('Label');
    const dataInputs = screen.getAllByPlaceholderText('Data');

    expect(labelInputs).toHaveLength(1);
    expect(dataInputs).toHaveLength(1);
  });

  it('calls setData and onClose when the Save button is clicked with valid data', () => {
    fireEvent.change(screen.getAllByPlaceholderText('Label')[0], { target: { value: 'Updated Label' } });
    fireEvent.change(screen.getAllByPlaceholderText('Data')[0], { target: { value: '50' } });

    fireEvent.click(screen.getByText('Save'));

    expect(mockSetData).toHaveBeenCalledWith({
      ...mockData,
      labels: ['Updated Label', 'Label 2'],
      datasets: [{ ...mockData.datasets[0], label: 'Test Chart', data: [50, 20] }],
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('disables the Save button if the form is invalid', () => {
    fireEvent.change(screen.getAllByPlaceholderText('Label')[0], { target: { value: '' } });

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });

  it('calls onClose when the Close button is clicked', () => {
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
