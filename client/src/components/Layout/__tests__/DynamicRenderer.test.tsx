import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import DynamicRenderer from '../DynamicRenderer';
import type { WidgetConfig } from '../../../types/widget';

describe('DynamicRenderer', () => {
  it('selects and renders the registered metric-card component', () => {
    const widget = {
      type: 'METRIC_CARD',
      title: 'Active Sessions',
      data: { value: '3,240' },
    } as unknown as WidgetConfig;

    render(<DynamicRenderer widget={widget} />);

    expect(screen.getByText('Active Sessions')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3,240' })).toBeInTheDocument();
  });

  it('shows a fallback message for an unsupported widget type', () => {
    const widget = {
      type: 'UNSUPPORTED_WIDGET',
      title: 'Unknown widget',
    } as unknown as WidgetConfig;

    render(<DynamicRenderer widget={widget} />);

    expect(screen.getByText(/Unsupported widget:/)).toBeInTheDocument();
    expect(screen.getByText('UNSUPPORTED_WIDGET')).toBeInTheDocument();
  });
});
