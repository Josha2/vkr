import React, { useState, useEffect, useCallback } from 'react';

import { MenuItem, Select, InputLabel } from '@material-ui/core';
import EmployeeService from '../../service/ApiService';
import Employee from '../../employee-data/employee-data';
import {Card1, Card2} from '../Card';


const SelectReport = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [page, setPage] = useState('Main');

    useEffect(() => {
        EmployeeService
            .getEmployees()
            .then((data) => {
                setEmployees(data);
            });
    }, [setEmployees]);
  
    const renderItems = useCallback((arr) => {
        return arr.map((item) => {
            return (
                <MenuItem 
                    key={item.employee_id}
                    value={item.employee_name}>
                    {item.employee_name}
                </MenuItem>
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
            <div className="row">
                <Card1 show={() => setPage('Card1')}/>
                <Card2/>
            </div>
        );
    };

    const showEmployeeList = () => {
        let { employee_name } = employees[0];
        return (
            <div className="form-group">
                <InputLabel id="employee-simple-select-outlined-label">
                    Сотрудник:
                </InputLabel>
                <Select
                    fullWidth
                    onChange={selectEmployee}
                    labelId="employee-simple-select-outlined-label"
                    id="employee-simple-select-outlined"
                    name="employee"
                    value={selectedEmployee.employee_name ?? employee_name}
                >
                    {employeesList}
                </Select>
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
            break;
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