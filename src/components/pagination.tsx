import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Link
        href="#"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={cn(
          "flex items-center gap-2 border border-gray-500 p-1 rounded-lg",
          {
            "cursor-not-allowed": currentPage === 1,
          }
        )}
      >
        <ChevronLeft />
        <span className="hidden sm:inline">Previous</span>
      </Link>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <Button
            onClick={() => onPageChange(page)}
            className={cn("text-black bg-white hover:bg-white/50 shadow", {
              "bg-black text-white hover:bg-black": currentPage === page,
            })}
            key={page}
          >
            {page}
          </Button>
        ))}
      </div>

      <Link
        href="#"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex items-center gap-2 border border-gray-500 p-1 rounded-lg",
          {
            "cursor-not-allowed": currentPage === totalPages,
          }
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight />
      </Link>
    </div>
  );
}
