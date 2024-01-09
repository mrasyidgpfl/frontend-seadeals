import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

interface NavbarProfileInitialState {
  avatarURL: string,
  favoriteCount: number,
}

const initialState:NavbarProfileInitialState = {
  avatarURL: '',
  favoriteCount: 0,
};

const favoriteURL = '/user/favorite-counts';
export const getFavoriteCount = createAsyncThunk(
  'navbarProfile/getFavoriteCount',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        favoriteURL,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const { data } = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const navbarProfileSlice = createSlice({
  name: 'navbarProfile',
  initialState,
  reducers: {
    setAvatarURL: (state, { payload }) => ({ ...state, avatarURL: payload }),
    setFavoriteCount: (state, { payload }) => {
      let count = 0;
      if (!Number.isNaN(Number(payload))) {
        count = Number(payload);
      }
      return { ...state, favoriteCount: count };
    },
    addFavoriteCount: (state) => ({ ...state, favoriteCount: state.favoriteCount + 1 }),
    reduceFavoriteCount: (state) => ({ ...state, favoriteCount: state.favoriteCount - 1 }),

    resetAvatarURL: (state) => ({ ...state, avatarURL: '' }),
    resetFavoriteCount: (state) => ({ ...state, favoriteCount: 0 }),
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteCount.fulfilled, (state, action) => {
      let count = 0;
      if (!Number.isNaN(Number(action?.payload?.favorite_count))) {
        count = Number(action?.payload?.favorite_count);
      }
      return { ...state, favoriteCount: count };
    });
    builder.addCase(getFavoriteCount.rejected, (state) => ({ ...state }));
  },
});

export const {
  setAvatarURL, setFavoriteCount,
  resetFavoriteCount, resetAvatarURL,
  addFavoriteCount, reduceFavoriteCount,
} = navbarProfileSlice.actions;

export default navbarProfileSlice.reducer;
