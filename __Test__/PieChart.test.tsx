import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PieChart from '../src/app/Components/PieChart/PieChart';

jest.mock('react-chartjs-2', () => ({
  Pie: () => <div>Mocked Pie Chart</div>, // Mock del componente Pie para evitar renderizarlo completamente
}));

jest.mock('./PieChartPopup', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <div>Mocked PieChartPopup</div>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('PieChart Component', () => {
  test('renders PieChart with dark mode enabled', () => {
    render(<PieChart darkMode={true} />);
    expect(screen.getByText('Mocked Pie Chart')).toBeInTheDocument();
    const editButton = screen.getByText(/Edit Data/i);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass('dark:bg-white dark:text-gray-800');
  });

  test('renders PieChart with dark mode disabled', () => {
    render(<PieChart darkMode={false} />);
    expect(screen.getByText('Mocked Pie Chart')).toBeInTheDocument();
    const editButton = screen.getByText(/Edit Data/i);
    expect(editButton).toBeInTheDocument();
    expect(editButton).not.toHaveClass('dark:bg-white dark:text-gray-800');
  });

  test('opens and closes the PieChartPopup when clicking the Edit Data button', () => {
    render(<PieChart darkMode={false} />);
    
    const editButton = screen.getByText(/Edit Data/i);
    fireEvent.click(editButton);
    
    // Verificar que el popup se muestra
    expect(screen.getByText(/Mocked PieChartPopup/i)).toBeInTheDocument();
    
    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    // Verificar que el popup se cierra
    expect(screen.queryByText(/Mocked PieChartPopup/i)).not.toBeInTheDocument();
  });
});
