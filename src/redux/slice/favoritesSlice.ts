import {createSlice} from '@reduxjs/toolkit';

type User = {
  id: {value: string | null};
  name: {first: string; last: string};
  email: string;
  picture: {thumbnail: string};
};

interface FavoritesState {
  favorites: User[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
});

export default favoritesSlice.reducer;
