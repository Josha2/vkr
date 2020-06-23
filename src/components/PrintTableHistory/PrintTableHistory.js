import React, { useState, useEffect } from 'react';

import propTypes from 'prop-types';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar/SearchBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const PrintTableHistory = (props) => {
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
            <TableCell 
                key={i} 
                className={`column${i}`}
                style={{fontWeight: "bold"}}>
                {item}
            </TableCell>
        );
    });


    return (
        <>
        
            <SearchBar search={search} total={searchableData.length}/>
            <TableContainer component={Paper} className="mb-2">
                <Table size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {printHeaderTitles}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {printData}
                    </TableBody>
                </Table>
            </TableContainer>
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

PrintTableHistory.propTypes = {
    rows: propTypes.array,
};

export default PrintTableHistory;