import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BarChartPopup from '../src/app/components/barchart/barchartPopup';
import { ChartData } from 'chart.js';

describe('BarChartPopup Component', () => {
  const mockData: ChartData<'bar', number[]> = {
    labels: ['Label 1', 'Label 2'],
    datasets: [{ label: 'Dataset 1', data: [10, 20] }],
  };

  const mockSetData = jest.fn();
  const mockSetTitle = jest.fn();
  const mockOnClose = jest.fn();
  const mockTitle = 'Initial Title';

  const renderComponent = () =>
    render(
      <BarChartPopup
        onClose={mockOnClose}
        data={mockData}
        setData={mockSetData}
        title={mockTitle}
        setTitle={mockSetTitle}
      />
    );

  test('renders popup with initial data and title', () => {
    renderComponent();

    expect(screen.getByText('Edit Bar Chart Data')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Initial Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Label 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Label 2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  test('allows adding a new label/data pair', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Add Label/Data Pair'));
    
    const newLabelInput = screen.getAllByDisplayValue('')[0];
    const newValueInput = screen.getAllByDisplayValue('0')[0];

    expect(newLabelInput).toBeInTheDocument();
    expect(newValueInput).toBeInTheDocument();
  });

  test('allows removing a label/data pair', () => {
    renderComponent();

    const initialLabelCount = screen.getAllByDisplayValue('Label 1').length;
    fireEvent.click(screen.getAllByText('Remove')[0]);
    
    const updatedLabelCount = screen.getAllByDisplayValue('Label 1').length;
    expect(updatedLabelCount).toBeLessThan(initialLabelCount);
  });

  test('updates title on input change', () => {
    renderComponent();

    const titleInput = screen.getByDisplayValue('Initial Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    expect(mockSetTitle).toHaveBeenCalledWith('Updated Title');
  });

  test('updates label and value on input change', () => {
    renderComponent();

    const labelInput = screen.getByDisplayValue('Label 1');
    const valueInput = screen.getByDisplayValue('10');

    fireEvent.change(labelInput, { target: { value: 'Updated Label' } });
    fireEvent.change(valueInput, { target: { value: 50 } });

    expect(labelInput).toHaveValue('Updated Label');
    expect(valueInput).toHaveValue(50);
  });

  test('calls setData and onClose when save button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Save'));

    expect(mockSetData).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Close'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});

