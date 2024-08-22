// LineChart.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LineChart from '../src/app/Components/LineChart/LineChart';

describe('LineChart Component', () => {
  const mockData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
  const mockOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  test('renders Line component correctly', () => {
    render(<LineChart darkMode={false} />);
    const lineComponent = screen.getByTestId('line-chart');
    expect(lineComponent).toBeInTheDocument();
  });

  test('updates Line component on dark mode change', () => {
    const { rerender } = render(<LineChart darkMode={false} />);
    let lineComponent = screen.getByTestId('line-chart');
    expect(lineComponent).toHaveStyle('background-color: white');

    rerender(<LineChart darkMode={true} />);
    lineComponent = screen.getByTestId('line-chart');
    expect(lineComponent).toHaveStyle('background-color: black');
  });

  test('opens LineChartPopup on button click', () => {
    render(<LineChart darkMode={false} />);
    const editButton = screen.getByText(/Edit Data/i);
    fireEvent.click(editButton);
    const popupTitle = screen.getByText(/Edit Line Chart Data/i); // Adjust according to actual title text
    expect(popupTitle).toBeInTheDocument();
  });
});