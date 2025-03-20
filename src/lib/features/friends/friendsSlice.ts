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
    { id: "1", name: "Abhinav", isFavorite: true },
    { id: "2", name: "Tarun", isFavorite: false },
    { id: "3", name: "Jitender", isFavorite: true },
    { id: "4", name: "Bharat", isFavorite: false },
    { id: "5", name: "Rajat", isFavorite: false },
  ],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    //ad friends
    addFriend: (state, action: PayloadAction<string>) => {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: action.payload,
        isFavorite: false,
      };
      state.friends.push(newFriend);
    },
    //toggle favorite
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const friend = state.friends.find(
        (friend) => friend.id === action.payload
      );
      if (friend) {
        friend.isFavorite = !friend.isFavorite;
      }
    },
    //remove friend
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
    },
  },
});

export const { removeFriend, addFriend, toggleFavorite } = friendsSlice.actions;
export default friendsSlice.reducer;
