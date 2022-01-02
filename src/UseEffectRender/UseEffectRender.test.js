import React from 'react';
import { render, screen } from '@testing-library/react';
import UseEffectRender from './UseEffectRender';

describe('useEffect rendering', () => {
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />);

    // "I am" 문자열이 표시되지 않은 것을 확인
    expect(screen.queryByText(/I am/)).toBeNull();

    // 비동기 통신의 결과를 컴포넌트가 반영하기까지 기다려줌
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
