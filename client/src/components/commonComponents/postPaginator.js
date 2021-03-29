import ReactPaginate from "react-paginate";
import { FormattedMessage } from "react-intl"
export const PostPaginator = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    previousLabel={<FormattedMessage id="previous-page"/>}
    nextLabel={<FormattedMessage id="next-page"/>}
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
