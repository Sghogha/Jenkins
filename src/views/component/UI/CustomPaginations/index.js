import React, { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./pagination.scss";
import { IntlContext } from "src/App";

const CustomPaginations = ({
  paginationArray,
  currentPage,
  handlePaginationButtonClick,
  list,
  handlePaginationClick,
  totalRecord,
}) => {
  const intlContext = useContext(IntlContext);
  const localesData = intlContext?.messages;

  return (
    <>
      {paginationArray && paginationArray.length > 0 ? (
        <div className="pagination-main">
          <div className="tablePagination">
            <p
              className={
                totalRecord && currentPage !== 1
                  ? "btn-navigation mr-3"
                  : "btn-navigation-disabled mr-3"
              }
              disabled={totalRecord && currentPage !== 1 ? false : true}
              onClick={() => handlePaginationButtonClick("prev")}
            >
              {localesData?.previous}
            </p>
            <Pagination
              hideNextButton
              hidePrevButton
              disabled={totalRecord && totalRecord / list > 1 ? false : true}
              page={currentPage}
              onChange={handlePaginationClick}
              count={totalRecord && Math.ceil(totalRecord / list)}
              // siblingCount={2}
              // boundaryCount={1}
              // size="small"
            />
            <p
              className={
                currentPage < Math.ceil(totalRecord / list)
                  ? "btn-navigation ml-3"
                  : "btn-navigation-disabled ml-3"
              }
              disabled={
                totalRecord && currentPage < Math.ceil(totalRecord / list)
                  ? false
                  : true
              }
              onClick={() => handlePaginationButtonClick("next")}
            >
              {localesData?.next}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomPaginations;
