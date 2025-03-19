import { Friend } from "@/lib/features/friends/friendsSlice";
import { Button } from "./ui/button";
import { Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FriendCardProps = {
  friend: Friend;
  onToggleFavorite?: () => void;
  onDelete: () => void;
};

export default function FriendCard({
  friend,
  onToggleFavorite,
  onDelete,
}: FriendCardProps) {
  return (
    <div className="flex justify-between items-center p-4 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      <div className="">{friend.name}</div>
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" size="icon" onClick={onToggleFavorite}>
          <Star
            className={cn("h-5 w-5 text-muted-foreground", {
              "fill-yellow-400 text-yellow-400": friend.isFavorite,
            })}
          />
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="" />
        </Button>
      </div>
    </div>
  );
}
