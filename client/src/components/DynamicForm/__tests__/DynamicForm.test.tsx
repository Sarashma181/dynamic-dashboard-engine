import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DynamicForm from '../DynamicForm';
import type { FormField } from '../../../types/widget';

const fields: FormField[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'age', label: 'Age', type: 'number', min: 0, max: 120 },
];

function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DynamicForm title="Create User" fields={fields} />
    </QueryClientProvider>,
  );
}

describe('DynamicForm', () => {
  it('renders the configured title and fields', () => {
    renderForm();

    expect(screen.getByRole('heading', { name: 'Create User' })).toBeInTheDocument();
    expect(document.querySelector('input[name="firstName"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="age"]')).toBeInTheDocument();
  });

  it('shows required-field validation when submitted empty', async () => {
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('prevents negative and scientific-notation keystrokes in number fields', () => {
    renderForm();

    const ageInput = document.querySelector<HTMLInputElement>('input[name="age"]');
    expect(ageInput).not.toBeNull();

    const minusEvent = new KeyboardEvent('keydown', { key: '-', bubbles: true, cancelable: true });
    ageInput?.dispatchEvent(minusEvent);
    expect(minusEvent.defaultPrevented).toBe(true);

    const exponentEvent = new KeyboardEvent('keydown', { key: 'e', bubbles: true, cancelable: true });
    ageInput?.dispatchEvent(exponentEvent);
    expect(exponentEvent.defaultPrevented).toBe(true);
  });
});
