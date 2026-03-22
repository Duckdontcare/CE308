import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
