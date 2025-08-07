import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  className?: string;
};

export function MyPagination({
  className,
  totalPages,
  currentPage = 1,
}: Props) {
  const pages = calculatePages(totalPages, currentPage);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}
        {pages.map((page) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function calculatePages(
  totalPages: number,
  currentPage: number,
): (string | number)[] {
  // If total pages is small, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const result: (string | number)[] = [];
  
  // Always show first page
  result.push(1);
  
  // Determine the range around current page
  const delta = 2; // Show 2 pages before and after current page
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
  
  // Add ellipsis after first page if needed
  if (rangeStart > 2) {
    result.push("ellipsis");
  }
  
  // Add pages around current page
  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (i !== 1 && i !== totalPages) { // Don't duplicate first/last page
      result.push(i);
    }
  }
  
  // Add ellipsis before last page if needed
  if (rangeEnd < totalPages - 1) {
    result.push("ellipsis");
  }
  
  // Always show last page (if more than 1 page total)
  if (totalPages > 1) {
    result.push(totalPages);
  }
  
  return result;
}
