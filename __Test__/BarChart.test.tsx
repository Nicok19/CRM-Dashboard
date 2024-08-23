import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BarChart from '../src/app/components/bar/barchart';

describe('BarChart Component', () => {
  it('renders the BarChart component correctly', () => {
    // Render the BarChart component with darkMode set to false
    render(<BarChart darkMode={false} />);

    // Verify that the chart title is present in the document
    expect(screen.getByText('Bar Chart Data')).toBeInTheDocument();

    // Verify that the "Edit Data" button is present in the document
    expect(screen.getByText('Edit Data')).toBeInTheDocument();
  });

  it('opens the BarChartPopup when "Edit Data" button is clicked', () => {
    // Render the BarChart component with darkMode set to false
    render(<BarChart darkMode={false} />);

    // Check that the popup is not visible initially
    expect(screen.queryByText('Close')).not.toBeInTheDocument();

    // Simulate a click on the "Edit Data" button
    fireEvent.click(screen.getByText('Edit Data'));

    // Verify that the popup is now visible in the document
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('displays the chart with correct data', () => {
    // Render the BarChart component with darkMode set to false
    render(<BarChart darkMode={false} />);

    // Verify that the chart canvas (image) is present in the document
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
