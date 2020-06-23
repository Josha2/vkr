import React from 'react';

import dateFormat from 'dateformat';
import PrintTableHistory from '../PrintTableHistory/PrintTableHistory';
import EmployeeService from '../../service/ApiService';
import TableCell from '@material-ui/core/TableCell';

const HistoryTable = () => {

    const historyTable = (
        <PrintTableHistory
            getData={EmployeeService.getHistory}
            headerTitles={[
                'ФИО', 'Факультет', 'Должность',
                'Тип отчёта', 'Дата создания', 'Сумма']}>
            {(item) => (
                <>
                <TableCell>{item.employee_name}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{dateFormat(item.date, 'dd-mm-yyyy')}</TableCell>
                <TableCell>{item.total}</TableCell>
                </>
            )}
        </PrintTableHistory>
    );

    return (
        <div className="container pt-2">
            {historyTable}
        </div>
    );
};

export default HistoryTable;