import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// User type definition
type User = {
  id: {value: string | null};
  name: {first: string; last: string};
  email: string;
  picture: {thumbnail: string};
};

// State interface
interface UsersState {
  users: User[];
  favorites: User[]; // Add favorites here
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: UsersState = {
  users: [],
  favorites: [], // Initialize favorites as an empty array
  status: 'idle',
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const response = await axios.get(
      `https://randomuser.me/api/?results=10&page=${page}`,
    );
    return response.data.results;
  },
);

// Slice definition
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const userToAdd = state.users.find(
        user => user.id.value === action.payload.id.value,
      );

      if (userToAdd) {
        state.favorites.push(userToAdd); // Add to favorites
        state.users = state.users.filter(
          user => user.id.value !== action.payload.id.value,
        ); // Remove from users
      }
    },
    removeFavorite(state, action) {
      const userToRemove = state.favorites.find(
        user => user.id.value === action.payload.id.value,
      );
      if (userToRemove) {
        state.users.push(userToRemove); // Add back to users
        state.favorites = state.favorites.filter(
          user => user.id.value !== action.payload.id.value,
        ); // Remove from favorites
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // Exclude already favorited users to avoid duplication
        const newUsers = action.payload.filter(
          (user: User) =>
            !state.favorites.some(fav => fav.id.value === user.id.value),
        );
        state.users = [...state.users, ...newUsers];
        state.status = 'succeeded';
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {addFavorite, removeFavorite} = usersSlice.actions;
export default usersSlice.reducer;
