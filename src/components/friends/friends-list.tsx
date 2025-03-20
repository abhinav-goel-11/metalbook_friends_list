"use client";

import { useDispatch, useSelector } from "react-redux";
import AddFriendForm from "./add-friend-form";
import { RootState } from "@/lib/store";
import FriendCard from "./friend-card";
import {
  removeFriend,
  toggleFavorite,
} from "@/lib/features/friends/friendsSlice";
import { useEffect, useMemo, useState } from "react";
import { itemsPerPage } from "@/lib/features/friends/constants";
import Pagination from "../pagination";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import DeleteConfirmationDialog from "../delete-confirmation-dialog";

export default function FriendsList() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.friends);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFavoritesFirst, setShowFavoritesFirst] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState("");

  const handleDeleteClick = (id: string) => {
    setIsDeleteDialogOpen(id);
  };

  const handleConfirmDelete = () => {
    dispatch(removeFriend(isDeleteDialogOpen));
    setIsDeleteDialogOpen("");
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen("");
  };

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
  const filteredFriends = useMemo(
    () =>
      friends.filter((friend) =>
        friend.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [debouncedSearchQuery, friends]
  );

  //sort friends based on favorites
  const sortedFriends = useMemo(
    () =>
      [...filteredFriends].sort((a, b) => {
        if (showFavoritesFirst) {
          return b.isFavorite === a.isFavorite
            ? a.name.localeCompare(b.name)
            : b.isFavorite
            ? 1
            : -1;
        }
        return a.name.localeCompare(b.name);
      }),
    [filteredFriends, showFavoritesFirst]
  );

  //paginated friends
  const totalPages = Math.ceil(sortedFriends.length / itemsPerPage);
  const paginatedFriends = useMemo(
    () =>
      sortedFriends.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, sortedFriends]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col sm:flex-row justify-between items-center">
        <div className="max-w-xs w-full relative">
          <Search className="absolute h-5 w-5 left-2 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search friends..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="pl-8"
          />
          {isSearching && (
            <Loader2 className="animate-spin absolute right-2.5 top-1/2 -translate-y-1/2" />
          )}
        </div>
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
              onDelete={() => handleDeleteClick(friend.id)}
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
      {friends.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={!!isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
