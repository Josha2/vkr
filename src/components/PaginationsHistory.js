import React from 'react';

import './Paginations.css';

export const PaginationHistory = ({ employeesPerPage, totalPages, currentEmployees, currentPage, paginate, nextPage, prevPage }) => {
    //---Высчитываем количество страниц
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalPages / employeesPerPage); index++) {
        pageNumbers.push(index)
    }

    let classNameNext = "page-item";
    if(currentEmployees.length < 6){
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
                <a 
                    href="/#"
                    className="page-link" 
                    aria-label="Previous"
                    style={{'color': '#4F9DDD'}}
                    onClick={() => prevPage(currentPage)}>
                    <span aria-hidden="true">
                        &laquo;
                    </span>
                    <span className="sr-only">
                        Previous
                    </span>
                </a>

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
                            <a 
                                href='/#'
                                className="page-link"
                                onClick={() => paginate(element)}>
                                {element}
                            </a>
                        </li>
                )})}

                <li className={classNameNext}>
                <a 
                    href="/#"
                    className="page-link"
                    aria-label="Next"
                    style={{'color': '#4F9DDD'}}
                    onClick={() => nextPage(currentEmployees)}>
                    <span aria-hidden="true">
                        &raquo;
                    </span>
                    <span className="sr-only">
                        Next
                    </span>
                </a>

                </li>
            </ul>
        </nav>
    );
};