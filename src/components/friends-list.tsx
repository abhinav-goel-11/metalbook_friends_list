"use client";

import { useDispatch, useSelector } from "react-redux";
import AddFriendForm from "./add-friend-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RootState } from "@/lib/store";
import FriendCard from "./friend-card";
import { removeFriend } from "@/lib/features/friends/friendsSlice";

export default function FriendsList() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.friends);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-center">
        <Input
          placeholder="Search friends..."
          //   value={searchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Button
          //   onClick={() => setShowFavoritesFirst(!showFavoritesFirst)}
          className="whitespace-nowrap"
        >
          {true ? "Sort by name" : "Favorites first"}
        </Button>
      </div>

      <AddFriendForm />

      {/* render list here */}
      <div className="flex flex-col gap-4">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onDelete={() => dispatch(removeFriend(friend.id))}
            />
          ))
        ) : (
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-muted-foreground text-center">
            No friends found. Add some friends or try a different search.
          </div>
        )}
      </div>

      {/* pagination */}
    </div>
  );
}
