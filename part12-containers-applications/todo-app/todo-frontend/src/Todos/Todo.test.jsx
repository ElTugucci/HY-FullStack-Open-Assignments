import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Todo from './Todo';

import '@testing-library/jest-dom';
test('renders todo item and handles actions', () => {
  const todo = { id: 1, text: 'Test Todo', done: false };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  const { getByText } = render(
    <Todo
      todo={todo}
      onClickDelete={mockDelete}
      onClickComplete={mockComplete}
    />
  );

  // Check that text is rendered
  expect(getByText('Test Todo')).toBeInTheDocument();
  expect(getByText('This todo is not done')).toBeInTheDocument();

  // Simulate clicking "Set as done"
  fireEvent.click(getByText('Set as done'));
  expect(mockComplete).toHaveBeenCalledWith(todo);

  // Simulate clicking "Delete"
  fireEvent.click(getByText('Delete'));
  expect(mockDelete).toHaveBeenCalledWith(todo);
});

