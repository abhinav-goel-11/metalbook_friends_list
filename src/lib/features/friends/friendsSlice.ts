import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Friend = {
  id: string;
  name: string;
  isFavorite: boolean;
};

type FriendsState = {
  friends: Friend[];
};

const initialState: FriendsState = {
  friends: [
    { id: "1", name: "Alex", isFavorite: true },
    { id: "2", name: "Taylor", isFavorite: false },
    { id: "3", name: "Jordan", isFavorite: true },
    { id: "4", name: "Casey", isFavorite: false },
    { id: "5", name: "Riley", isFavorite: false },
  ],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    //remove friend
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
    },
  },
});

export const { removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
