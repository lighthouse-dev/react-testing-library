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
  it('Input 요소에 문자열 입력했을 경우 value를 업데이트', () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});

describe('Console button conditionally triggered', () => {
  it('Input요소에 문자열이 입력되지 않았을 경우 Output 함수를 실행', () => {
    // Mock関数作成し、渡す
    const mockOutputConsole = jest.fn();
    render(<RenderInput outputConsole={mockOutputConsole} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockOutputConsole).not.toHaveBeenCalled();
  });

  it('Input요소에 문자열이 입력되었을 경우 Output 함수를 실행', () => {
    // Mock関数作成し、渡す
    const mockOutputConsole = jest.fn();
    render(<RenderInput outputConsole={mockOutputConsole} />);
    const inputValue = screen.getByPlaceholderText('Enter');
    userEvent.type(inputValue, 'test');
    userEvent.click(screen.getByRole('button'));
    expect(mockOutputConsole).toHaveBeenCalled();
  });
});
