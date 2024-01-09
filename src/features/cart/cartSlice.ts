import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface CartInitialState {
  recentCartItems: any[],
  checkedIDs: number[],
  total: number,
}

const initialState:CartInitialState = {
  recentCartItems: [],
  checkedIDs: [],
  total: 0,
  // isLoading: true,
};

const parseToCartItemState = (fetchedItems: any[]) => fetchedItems.map((item) => ({
  id: item.id,
  product_name: item.product_name,
  image_url: item.image_url,
  product_slug: item.product_slug,
  price_before_discount: item.price_before_discount,
}));

const cartURL = 'user/cart?limit=5';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        cartURL,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      return response.data.data;
    } catch (err:any) {
      return rejectWithValue(err);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      if (state.recentCartItems.find(
        (item) => item.cartItemID === payload.cartItemID,
      )) return { ...state };
      // let newCartItems = [payload, ...state.recentCartItems];
      // if (newCartItems.length > 5) { newCartItems = newCartItems.slice(0, -1); }
      // return { ...state, recentCartItems: newCartItems, total: state.total + 1 };
      return { ...state };
    },
    removeCartItem: (state, { payload }) => {
      const newCartItems = state.recentCartItems.filter(
        (item) => item.cartItemID !== payload,
      );
      // let total = state.total - 1;
      // if (total < 0) { total = 0; }
      // return { ...state, recentCartItems: newCartItems, total };
      return { ...state, recentCartItems: newCartItems };
    },
    checkCartItem: (state, { payload }) => {
      const checkedIDs = [...state.checkedIDs, payload];
      return { ...state, checkedIDs };
    },
    uncheckCartItem: (state, { payload }) => {
      const checkedIDs = state.checkedIDs.filter((item) => item !== payload);
      return { ...state, checkedIDs };
    },
    checkCartBuyNow: (state, { payload }) => {
      const checkedIDs = [payload];
      return { ...state, checkedIDs };
    },
    clearChecked: (state) => ({ ...state, checkedIDs: [] }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      const recentCartItems = parseToCartItemState(action?.payload?.cart_items || []);
      // const recentCartItems = action.payload.cart_items;
      const total = action?.payload?.total_data || 0;
      return { ...state, recentCartItems, total };
    });
    builder.addCase(getCartItems.rejected, (state) => ({ ...state }));
  },
});

export const {
  addCartItem, removeCartItem, checkCartItem,
  uncheckCartItem, checkCartBuyNow, clearChecked,
} = cartSlice.actions;

export default cartSlice.reducer;
