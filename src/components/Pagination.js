import React from 'react';

import './Pagination.css';

const Pagination = ({ dataPerPage, totalPages, currentGroup, currentPage, paginate, nextPage, prevPage }) => {
    //---Высчитываем количество страниц
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalPages / dataPerPage); index++) {
        pageNumbers.push(index)
    }

    let classNameNext = "page-item";
    if(currentGroup.length < 6){
        classNameNext += " disabled";
    } 

    let classNamePrev = "page-item";
    if(currentPage === 1) {
        classNamePrev += " disabled";
    }
    

    return (
        <nav className="pages">
            <ul className="pagination justify-content-center">

                <li className={classNamePrev}>
                <button 
                    className="page-link" 
                    aria-label="Previous"
                    style={{color: '#4F9DDD'}}
                    onClick={() => prevPage(currentPage)}>
                    <span aria-hidden="true">
                        &laquo;
                    </span>
                    <span className="sr-only">
                        Previous
                    </span>
                </button>

                </li>

                {pageNumbers.map((element) => {
                    let classNames = "page-item";

                    if(element === currentPage){
                        classNames += " active"
                    }

                    return (
                        <li 
                            key={element} 
                            className={classNames}>
                            <button 
                                className="page-link"
                                onClick={() => paginate(element)}>
                                {element}
                            </button>
                        </li>
                )})}

                <li className={classNameNext}>
                <button
                    className="page-link"
                    aria-label="Next"
                    style={{color : '#4F9DDD'}}
                    onClick={() => nextPage(currentGroup)}>
                    <span aria-hidden="true">
                        &raquo;
                    </span>
                    <span className="sr-only">
                        Next
                    </span>
                </button>

                </li>
            </ul>
        </nav>
    );
};

export default Pagination;