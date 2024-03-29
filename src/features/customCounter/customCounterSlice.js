import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from 'axios';

const sleep = msec => {
  const start = new Date();
  while (new Date() - start < msec);
};

// 비동기 함수
export const fetchDummy = createAsyncThunk('fetch/dummy', async num => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk('fetch/api', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: 'costomCounter',
  initialState: {
    mode: 0,
    value: 0,
    username: ''
  },
  reducers: {
    increment: state => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    }
  },
  extraReducers: builder => {
    // fetchDummy 성공
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });

    // fetchDummy 성공
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });

    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      state.username = action.payload;
    });
  }
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = state => state.costomCounter.value;
export const selectUserName = state => state.costomCounter.username;

export default customCounterSlice.reducer;
