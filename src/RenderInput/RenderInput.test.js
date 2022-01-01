import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderInput from './RenderInput';

afterEach(() => cleanup()); // cleanupでコンポーネントのunmountをしてくれる

describe('Rendering', () => {
  it('Should render all the delements correctly', () => {
    render(<RenderInput />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter'));
  });
});

describe('Input form onChange event', () => {
  it('Should update input value correctly', () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});

describe('Console button conditionally triggered', () => {
  it('Should not trigger output function', () => {
    // Mock関数作成し、渡す
    const mockOutputConsole = jest.fn();
    render(<RenderInput outputConsole={mockOutputConsole} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockOutputConsole).not.toHaveBeenCalled();
  });

  it('Should trigger output function', () => {
    // Mock関数作成し、渡す
    const mockOutputConsole = jest.fn();
    render(<RenderInput outputConsole={mockOutputConsole} />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    userEvent.click(screen.getByRole('button'));
    expect(mockOutputConsole).toHaveBeenCalled();
  });
});
