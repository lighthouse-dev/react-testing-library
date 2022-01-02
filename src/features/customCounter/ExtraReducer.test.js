import reducer, { fetchDummy } from './customCounterSlice';

describe('extraReducers', () => {
  const initialState = {
    mode: 0,
    value: 0
  };

  test('fetch 성공한 경우_state값이 "100 + payload값" 이 된다', () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);

    expect(state.value).toEqual(105);
  });

  test('fetch 실패한 경우_state값이 "100 - payload값" 이 된다', () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);

    expect(state.value).toEqual(95);
  });
});
