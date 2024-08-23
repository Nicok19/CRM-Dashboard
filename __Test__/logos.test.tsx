import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logos from '../src/app/components/logos/logos';

describe('Logos Component', () => {
  test('renders the title', () => {
    render(<Logos />);
    
    const titleElement = screen.getByText('This project was made with these technologies:');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-center text-blue-500 dark:text-white font-bold w-2/3 text-2xl 2xl:text-4xl mb-20 m-auto');
  });

  test('renders all logos with their respective alt texts', () => {
    render(<Logos />);
    
    const nextJsLogo = screen.getByAltText('Next.js Logo');
    const typeScriptLogo = screen.getByAltText('TypeScript Logo');
    const chartJsLogo = screen.getByAltText('Chart.js Logo');
    const tailwindLogo = screen.getByAltText('Tailwind CSS Logo');

    expect(nextJsLogo).toBeInTheDocument();
    expect(typeScriptLogo).toBeInTheDocument();
    expect(chartJsLogo).toBeInTheDocument();
    expect(tailwindLogo).toBeInTheDocument();
  });

  test('renders all technology names', () => {
    render(<Logos />);
    
    const nextJsText = screen.getByText('Next.js');
    const typeScriptText = screen.getByText('TypeScript');
    const chartJsText = screen.getByText('Chart.js');
    const tailwindText = screen.getByText('Tailwind CSS');

    expect(nextJsText).toBeInTheDocument();
    expect(typeScriptText).toBeInTheDocument();
    expect(chartJsText).toBeInTheDocument();
    expect(tailwindText).toBeInTheDocument();
  });
});
