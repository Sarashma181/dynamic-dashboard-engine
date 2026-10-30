import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import MetricCard from '../MetricCard';

describe('MetricCard', () => {
  it('renders the metric title and value', () => {
    render(<MetricCard title="Total Users" data={{ value: '12,450' }} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '12,450' })).toBeInTheDocument();
  });

  it('renders the optional unit and trend', () => {
    render(
      <MetricCard
        title="Monthly Revenue"
        data={{ value: '85,000', unit: 'AED', trend: '+8%', status: 'success' }}
      />,
    );

    expect(screen.getByText('AED')).toBeInTheDocument();
    expect(screen.getByText('+8%')).toBeInTheDocument();
  });

  it('does not render optional elements when they are not provided', () => {
    render(<MetricCard title="Active Sessions" data={{ value: '3,240' }} />);

    expect(screen.queryByText('AED')).not.toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
