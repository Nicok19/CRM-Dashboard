import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import LineChartPopup from '../src/app/components/line/linechartPopup';
import { ChartData } from 'chart.js';

describe('LineChartPopup Component', () => {
  const mockData: ChartData<'line', number[]> = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80],
      },
    ],
  };

  const mockSetData = jest.fn();
  const mockOnClose = jest.fn();
  const mockSetTitle = jest.fn();

  test('renders popup correctly', () => {
    render(
      <LineChartPopup
        data={mockData}
        setData={mockSetData}
        onClose={mockOnClose}
        title="Test Title"
        setTitle={mockSetTitle}
      />
    );
    const popupElement = screen.getByText(/Test Title/i);
    expect(popupElement).toBeInTheDocument(); 
  });

 
});
