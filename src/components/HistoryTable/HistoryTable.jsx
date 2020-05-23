import React, { useState } from 'react';

import dateFormat from 'dateformat';
import PrintTable from '../PrintTable/PrintTable';
import EmployeeService from '../../service/ApiService';

const HistoryTable = () => {

    const historyTable = (
        <PrintTable
            getData={EmployeeService.getHistory}
            headerTitles={[
                'ФИО', 'Факультет', 'Должность',
                'Тип отчёта', 'Дата создания', 'Сумма']}>
            {(item) => (
                <>
                <td>{item.employee_name}</td>
                <td>{item.department}</td>
                <td>{item.position}</td>
                <td>{item.type}</td>
                <td>{dateFormat(item.date, 'dd-mm-yyyy')}</td>
                <td>{item.total}</td>
                </>
            )}
        </PrintTable>
    );

    return (
        <div className="container pt-2">
            {historyTable}
        </div>
    );
};

export default HistoryTable;