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
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const result: (string | number)[] = [];

  result.push(1);

  const delta = 2;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  if (rangeStart > 2) {
    result.push("ellipsis");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (i !== 1 && i !== totalPages) {
      result.push(i);
    }
  }

  if (rangeEnd < totalPages - 1) {
    result.push("ellipsis");
  }

  if (totalPages > 1) {
    result.push(totalPages);
  }

  return result;
}
