import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MockServer from './MockServer';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }));
  })
);

beforeAll(() => server.listen()); // 최초 1회 실행 => mock server 기동
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close()); // 마지막 1회 실행 => mock server 종료

describe('Mocking API', () => {
  it('[Fetch success] Should display fetched data correctly and button disable', async () => {
    render(<MockServer />);

    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByRole('heading')).toHaveTextContent('Bred dummy');
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('[Fetch failure] Should display error msg, no render heading and button abled', async () => {
    // API Response를 에러 내용으로 대체
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);

    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Fetching Failed !'
    );
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
