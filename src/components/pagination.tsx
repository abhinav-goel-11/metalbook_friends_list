import { cn } from "@/lib/utils";
import {
  //   PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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
      <PaginationPrevious
        href="#"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={cn("", { "cursor-not-allowed": currentPage === 1 })}
      />
      {pages.map((page) => (
        <PaginationLink
          href="#"
          isActive={currentPage === page}
          onClick={() => onPageChange(page)}
          key={page}
        >
          {page}
        </PaginationLink>
      ))}
      <PaginationNext
        href="#"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={cn("", { "cursor-not-allowed": currentPage === totalPages })}
      />
    </div>
  );
}
