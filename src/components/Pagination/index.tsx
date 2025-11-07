import { PaginationButton, PaginationContainer } from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  maxVisible?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  maxVisible = 5,
  onPageChange,
}: PaginationProps) {
  function getVisibleRange(current: number, total: number, maxVisible: number) {
    const half = Math.floor(maxVisible / 2) // how many buttons on each side
    let start = Math.max(1, current - half) // starts 2 before the current one
    const end = Math.min(total, start + maxVisible - 1) // ends 2 later

    // Adjust the start if you don't have enough numbers at the end.
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    return { start, end }
  }

  const { start, end } = getVisibleRange(currentPage, totalPages, maxVisible)

  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  ).filter((page) => page !== 1 && page !== totalPages)

  const showStartEllipsis = start > 2
  const showEndEllipsis = end < totalPages - 1

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        Anterior
      </PaginationButton>

      <PaginationButton
        onClick={() => onPageChange(1)}
        aria-current={1 === currentPage ? 'page' : undefined}
        style={{ fontWeight: currentPage === 1 ? '700' : '400' }}
      >
        1
      </PaginationButton>

      {showStartEllipsis && <span>...</span>}

      {visiblePages.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          style={{ fontWeight: currentPage === page ? '700' : '400' }}
        >
          {page}
        </PaginationButton>
      ))}

      {showEndEllipsis && <span>...</span>}

      {totalPages > 1 && (
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          aria-current={totalPages === currentPage ? 'page' : undefined}
          style={{ fontWeight: currentPage === totalPages ? '700' : '400' }}
        >
          {totalPages}
        </PaginationButton>
      )}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        Próximo
      </PaginationButton>
    </PaginationContainer>
  )
}
