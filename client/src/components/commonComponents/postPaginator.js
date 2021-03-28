import ReactPaginate from "react-paginate";
export const PostPaginator = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    previousLabel="← Previous"
    nextLabel="Next →"
    pageCount={pageCount}
    onPageChange={onPageChange}
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    breakLabel={"..."}
    breakClassName={"break-me"}
    pageClassName="page"
    containerClassName="pagination"
    previousLinkClassName="page-link"
    nextLinkClassName="page-link"
    disabledClassName="page-link-disabled"
    activeClassName="page-link-active"
  />
);
