import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Table } from '../../../src/ui/Table/Table';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

type TestData = {
  name: string;
  age: number;
  city: string;
};

describe('Table', () => {
  const mockFields = [
    { header: 'Name', valueKey: 'name' as keyof TestData },
    { header: 'Age', valueKey: 'age' as keyof TestData },
    { header: 'City', valueKey: 'city' as keyof TestData },
  ];

  const mockData: TestData[] = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'London' },
  ];

  it('should render table with subtitle', () => {
    renderWithTheme(
      <Table subtitle="Test Subtitle" fields={mockFields} data={mockData} />,
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should render table with name', () => {
    renderWithTheme(
      <Table name="Test Table" subtitle="Subtitle" fields={mockFields} data={mockData} />,
    );
    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('should render all headers', () => {
    renderWithTheme(<Table subtitle="Test" fields={mockFields} data={mockData} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
  });

  it('should render all data rows', () => {
    renderWithTheme(<Table subtitle="Test" fields={mockFields} data={mockData} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  it('should render empty table when no data', () => {
    renderWithTheme(<Table subtitle="Empty Table" fields={mockFields} data={[]} />);
    
    expect(screen.getByText('Empty Table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(
      <Table subtitle="Test" fields={mockFields} data={mockData} size={SizeDict.S} />,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Table subtitle="Test" fields={mockFields} data={mockData} size={SizeDict.M} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Table subtitle="Test" fields={mockFields} data={mockData} size={SizeDict.L} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should use default size when not specified', () => {
    renderWithTheme(<Table subtitle="Test" fields={mockFields} data={mockData} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle single field', () => {
    const singleField = [{ header: 'Name', valueKey: 'name' as keyof TestData }];
    
    renderWithTheme(<Table subtitle="Single" fields={singleField} data={mockData} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.queryByText('Age')).not.toBeInTheDocument();
  });

  it('should handle single row', () => {
    const singleRow = [mockData[0]];
    
    renderWithTheme(<Table subtitle="Single Row" fields={mockFields} data={singleRow} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('should render without name when not provided', () => {
    const { container } = renderWithTheme(
      <Table subtitle="Test" fields={mockFields} data={mockData} />,
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});
