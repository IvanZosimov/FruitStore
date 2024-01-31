import { configureStore } from '@reduxjs/toolkit';
import fruitsReducer from "./fruitsSlice";

export const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch