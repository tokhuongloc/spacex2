import { configureStore } from '@reduxjs/toolkit';
import spacexReducer from '../slices/spacexv3/spacexSlice';
export const store = configureStore({
  reducer: {
    spacex: spacexReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
