import React, { useState, useEffect } from 'react';

import propTypes from 'prop-types';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar/SearchBar';

import './PrintTable.css';

const PrintTable = (props) => {
    const { getData, headerTitles, children } = props;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(6);
    const [term, setTerm] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await getData();
            setData(data);
        };

        fetch();
    }, [getData, children]);

    const paginate = (currentPage) => {
        setCurrentPage(currentPage)
    };

    const nextPage = (currentGroup) => {
        if(currentGroup.length > 5){
            setCurrentPage(currentPage + 1);
        };
    };

    const prevPage = (currentPage) => {
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        };
    };

    const searchTitle = (arr, term) => {
        if (term.length === 0){
            return arr;
        }
        return arr.filter((item) => {
            return item.employee_name
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    const search = (e) => {
        setTerm(e.target.value);
        setCurrentPage(1);
    };

    const searchableData = searchTitle(data, term);
    const indexOfLastItem= currentPage * dataPerPage;
    const IndexOfFirstItem = indexOfLastItem - dataPerPage;
    const visibleData = searchableData.slice(IndexOfFirstItem, indexOfLastItem);

    const printData = visibleData.map((item, i) => {
        const content = children(item);
        return (
            <tr key={i}>
               {content}
            </tr>
        );
    });

    const printHeaderTitles = headerTitles.map((item, i) => {
        return (
            <th key={i} className={`column${i}`}>
                {item}
            </th>
        );
    });


    return (
        <>
            <SearchBar search={search} total={searchableData.length}/>
            <table className="table-name">
                <thead>
                    <tr>
                        {printHeaderTitles}
                    </tr>
                </thead>
                <tbody>
                    {printData}
                </tbody>
            </table>
            <Pagination 
                dataPerPage={dataPerPage} 
                totalPages={searchableData.length}
                currentGroup={visibleData}
                currentPage={currentPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}/>
        </>
    );

};

PrintTable.propTypes = {
    rows: propTypes.array,
};

export default PrintTable;