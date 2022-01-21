import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

interface PaginatorProps {
    page: number,
    totalPages: number,
    itemsFrom: number,
    itemsTo: number,
    totalItemsCount: number,
    onPageChanged: Function
}

const Paginator: React.FC<PaginatorProps> = ({page, totalPages, itemsFrom, itemsTo, totalItemsCount, onPageChanged}) => {

    // const [pageNumber, setPageNumber] = useState(1);

    const goToPage = (page: number) => {
        // setPageNumber(page);
        onPageChanged(page);
    }

    const goToNextPage = () => {
        // setPageNumber(previous => {
        onPageChanged(page + 1);
        //     return previous + 1;
        // });
    }

    const goToPreviousPage = () => {
        // setPageNumber(previous => {
        onPageChanged(page - 1);
        //     return previous - 1;
        // });
    }

    return (
    <>
    {
    page > 0 && page <= totalPages &&
    <Pagination className="justify-content-center">
        <Pagination.First onClick={() => goToPage(1)} disabled={page === 1} />
        <Pagination.Prev onClick={goToPreviousPage} disabled={page === 1} />
        {
            page >= 4 && totalPages - page >= 3 && totalPages > 7 &&
            <>
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => goToPage(page - 1)}>{page - 1}</Pagination.Item>
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Item onClick={() => goToPage(page + 1)}>{page + 1}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{totalPages}</Pagination.Item>
            </>
        }
        {
            page <= 4 && totalPages <= 4 &&
            Array.from(Array(totalPages).keys()).map((pageNumber, index) => {
                return <Pagination.Item key={index} onClick={() => goToPage(pageNumber + 1)} active={pageNumber + 1 === page}>{pageNumber + 1}</Pagination.Item>
            })
        }
        {
            page < 4 && totalPages > 4 &&
            <>
            <Pagination.Item onClick={() => goToPage(1)} active={1 === page}>{1}</Pagination.Item>
            <Pagination.Item onClick={() => goToPage(2)} active={2 === page}>{2}</Pagination.Item>
            <Pagination.Item onClick={() => goToPage(3)} active={3 === page}>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{totalPages}</Pagination.Item>
            </>
        }
        {
            totalPages - page < 3 &&
            <>
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => goToPage(totalPages - 2)} active={totalPages - 2 === page}>{totalPages - 2}</Pagination.Item>
            <Pagination.Item onClick={() => goToPage(totalPages - 1)} active={totalPages - 1 === page}>{totalPages - 1}</Pagination.Item>
            <Pagination.Item onClick={() => goToPage(totalPages)} active={totalPages === page}>{totalPages}</Pagination.Item>
            </>
        }
        <Pagination.Next onClick={goToNextPage} disabled={page === totalPages} />
        <Pagination.Last onClick={() => goToPage(totalPages)} disabled={page === totalPages} />
    </Pagination>
    }
    {
        (page <= 0 || page > totalPages) &&
        <p className="fw-bold text-danger">Podano zły numer strony</p>
    }
    </>
    );
}

export default Paginator;
