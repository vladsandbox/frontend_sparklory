import ReactPaginate from 'react-paginate';
import NextArrow from "@/assets/icons/pag-arrow-right.svg?react";
import PrevArrow from "@/assets/icons/pag-arrow-left.svg?react";

import './index.scss';

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function CatalogPagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => {
                onPageChange(selected + 1);
            }}

            containerClassName="pagination"
            pageClassName="pagination__item"
            pageLinkClassName="pagination__link"
            activeClassName="pagination__item--active"
            disabledClassName="pagination__item--disabled"
            disabledLinkClassName="pagination__link--disabled"

            previousClassName="pagination__item"
            previousLinkClassName="btn-prev"
            nextClassName="pagination__item"
            nextLinkClassName="btn-next"
            breakClassName="break-label"

            breakLabel="..."
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            previousLabel={<span className="btn-prev"><PrevArrow /> Prev</span>}
            nextLabel={<span className="btn-next">Next <NextArrow /></span>}
        />
    );
}