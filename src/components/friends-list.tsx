import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function FriendsList() {
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
    </div>
  );
}
