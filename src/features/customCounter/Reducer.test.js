import reducer, {
  increment,
  decrement,
  incrementByAmount
} from './customCounterSlice';

describe('Reducer of ReduxToolKit', () => {
  describe('increment action', () => {
    let initialState = {
      mode: 0,
      value: 1
    };

    test('mode 가 0일 경우 State는 초기값 + 1', () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(2);
    });

    test('mode 가 1일 경우 State는 초기값 + 100', () => {
      initialState = {
        mode: 1,
        value: 1
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(101);
    });

    test('mode 가 2일 경우 State는 초기값 + 10000', () => {
      initialState = {
        mode: 2,
        value: 1
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(10001);
    });
  });

  describe('incrementByAmount action', () => {
    let initialState = {
      mode: 0,
      value: 1
    };

    test('mode 가 0일 경우 State는 초기값 + payload 값', () => {
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(4);
    });

    test('mode 가 1일 경우 State는 초기값 + 100 * payload 값', () => {
      initialState = {
        mode: 1,
        value: 1
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(301);
    });

    test('mode 가 2일 경우 State는 초기값 + 10000 * payload 값', () => {
      initialState = {
        mode: 2,
        value: 1
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(30001);
    });
  });
});
