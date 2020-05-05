import React, { useState, useEffect, useCallback } from 'react';

import EmployeeService from '../service/ApiService';
import Employee from '../employee-data/employee-data';


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        EmployeeService.getEmployees().then((data) => {
            setEmployees(data);
            setLoading(false);
        });
    }, [EmployeeService, setEmployees, setLoading])
  
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
        EmployeeService.getEmployee(e.target.value).then(
            (selectedEmployee) => {
                setSelectedEmployee(selectedEmployee);
            });
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }
    
    let employeeInfo = 
        Object.keys(selectedEmployee).length === 0 
        ? <p>Выберете сотрудника!</p> 
        : <Employee selectedEmployee={selectedEmployee}/>

        const employeesList = renderItems(employees);
        return (
            <div className="container-list">
                <select className="custom-select" onClick={selectEmployee}>
                    {employeesList}
                </select> 
                {employeeInfo}
            </div>
        )
}

export default EmployeeList;