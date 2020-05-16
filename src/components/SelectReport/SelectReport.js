import React, { useState, useEffect, useCallback } from 'react';

import EmployeeService from '../../service/ApiService';
import Employee from '../../employee-data/employee-data';
import {Card1, Card2} from '../Card';


function SelectReport() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [page, setPage] = useState('Main');

    useEffect(() => {
        EmployeeService
            .getEmployees()
            .then((data) => {
                console.log(data);
                setEmployees(data);
            });
    }, [setEmployees]);
  
    const renderItems = useCallback((arr) => {
        return arr.map((item) => {
            return (
                <option key={item.employee_id}>
                    {item.employee_name}
                </option>
            );
        });
    }, []);

    const selectEmployee = useCallback((e) => {
        EmployeeService
            .getEmployee(e.target.value)
            .then((selectedEmployee) => setSelectedEmployee(selectedEmployee));
    }, [setSelectedEmployee]);

    const employeesList = renderItems(employees);

    const showAll = () => {
        return (
            <div class="row">
                <Card1 show={() => setPage('Card1')}/>
                <Card2/>
            </div>
        );
    };

    const showEmployeeList = () => {
        return (
            <div className="form-group">
                <label 
                    htmlFor="employee" 
                    className="col-3 col-form-label">
                        Сотрудник:
                </label>
                <select 
                    className="custom-select" 
                    onClick={selectEmployee}
                    id="employee">
                {employeesList}
            </select> 
          </div>
        );
    };

    let mainpage = null;

    switch (page) {
        case 'Main':
            mainpage = showAll();
            break;
        case 'Card1':
            mainpage = showEmployeeList();
        default:
            break;
    };
    
    const employeeInfo = Object.keys(selectedEmployee).length === 0 
    ? null 
    : <Employee selectedEmployee={selectedEmployee}/>

    return (
        <div className="container pt-2">
            {mainpage}
            {employeeInfo}
        </div>
    );
};

export default SelectReport;