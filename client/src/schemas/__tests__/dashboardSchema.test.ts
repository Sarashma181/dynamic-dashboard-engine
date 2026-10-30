import { describe, expect, it } from '@jest/globals';
import { DashboardSchema, WidgetSchema } from '../dashboardSchema';

const validDashboard = {
  theme: 'dark',
  layout: 'grid-3',
  widgets: [
    {
      type: 'METRIC_CARD',
      title: 'Total Users',
      data: { value: '12,450', trend: '+12%' },
    },
    {
      type: 'CHART',
      title: 'Revenue Trend',
      data: [{ month: 'Jan', value: 12000 }],
    },
  ],
};

describe('DashboardSchema', () => {
  it('accepts a dashboard containing supported widget configurations', () => {
    expect(DashboardSchema.safeParse(validDashboard).success).toBe(true);
  });

  it('rejects an unsupported widget type', () => {
    const result = WidgetSchema.safeParse({
      type: 'MAP',
      title: 'Regional Map',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a chart data point with a non-numeric value', () => {
    const result = WidgetSchema.safeParse({
      type: 'CHART',
      title: 'Revenue Trend',
      data: [{ month: 'Jan', value: 'twelve thousand' }],
    });

    expect(result.success).toBe(false);
  });

  it('rejects a table row with an invalid amount type', () => {
    const result = WidgetSchema.safeParse({
      type: 'TABLE',
      title: 'Transactions',
      columns: ['id', 'customer', 'amount', 'status'],
      rows: [{ id: 1, customer: 'Customer 1', amount: '100', status: 'Paid' }],
    });

    expect(result.success).toBe(false);
  });
});
