"use client";

import { useDispatch, useSelector } from "react-redux";
import AddFriendForm from "./add-friend-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RootState } from "@/lib/store";
import FriendCard from "./friend-card";
import {
  removeFriend,
  toggleFavorite,
} from "@/lib/features/friends/friendsSlice";
import { useEffect, useState } from "react";
import { itemsPerPage } from "@/lib/features/friends/constants";
import Pagination from "./pagination";
import useDebounce from "@/hooks/useDebounce";

export default function FriendsList() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.friends);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFavoritesFirst, setShowFavoritesFirst] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchInputValue, 300);

  useEffect(() => {
    setCurrentPage(1);
    if (searchInputValue !== debouncedSearchQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchQuery, searchInputValue]);

  //filter friends based on search query
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  //sort friends based on favorites
  const sortedFriends = [...filteredFriends].sort((a, b) => {
    if (showFavoritesFirst) {
      return b.isFavorite === a.isFavorite
        ? a.name.localeCompare(b.name)
        : b.isFavorite
        ? 1
        : -1;
    }
    return a.name.localeCompare(b.name);
  });

  //paginated friends
  const totalPages = Math.ceil(sortedFriends.length / itemsPerPage);
  const paginatedFriends = sortedFriends.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log("isSearching", isSearching);
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-center">
        <Input
          placeholder="Search friends..."
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="outline"
          onClick={() => setShowFavoritesFirst((prev) => !prev)}
          className="whitespace-nowrap"
        >
          {showFavoritesFirst ? "Sort by name" : "Favorites first"}
        </Button>
      </div>

      <AddFriendForm />

      {/* render list here */}
      <div className="flex flex-col gap-4">
        {paginatedFriends.length > 0 ? (
          paginatedFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onDelete={() => dispatch(removeFriend(friend.id))}
              onToggleFavorite={() => dispatch(toggleFavorite(friend.id))}
            />
          ))
        ) : (
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-muted-foreground text-center">
            No friends found. Add some friends or try a different search.
          </div>
        )}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
