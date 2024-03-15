import { Pagination } from "react-bootstrap"

export default function PaginationTool({ currentPage, totalPage, onPageChange }) {
  const renderPaginationItems = () => {
    const items = [];

    for (let page = 1; page <= totalPage; page++) {
        items.push(
            <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
                {page}
            </Pagination.Item>
        )
    }

    return items;

  }
  
    return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
      {renderPaginationItems()}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
      <Pagination.Last onClick={() => onPageChange(totalPage)} />
    </Pagination>
  )
}
