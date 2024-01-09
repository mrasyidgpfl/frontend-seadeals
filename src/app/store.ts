import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import navbarProfileReducer from '../features/navbarProfile/navbarProfileSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    navbarProfile: navbarProfileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
