import React from 'react';
import { render, screen } from '@testing-library/react';
import Render from './Render';

describe('Rendering', () => {
  it('すべての要素をレンダリング', () => {
    render(<Render />);
    // screen.debug();
    // screen.debug(screen.getByRole('heading'));

    //https://github.com/A11yance/aria-query#elements-to-roles
    //screen.debug(screen.getByRole("heading"));
    //https://jestjs.io/docs/en/expect

    // 存在有無判定
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getAllByRole('button')[0]).toBeTruthy();
    expect(screen.getAllByRole('button')[1]).toBeTruthy();
    expect(screen.getByText('Julee')).toBeTruthy();
    expect(screen.queryByText('Jslee')).toBeNull(); // ないことを判定する場合
    expect(screen.getByTestId('copyright')).toBeTruthy();
  });
});
