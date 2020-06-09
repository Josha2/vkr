import React, { useCallback, useEffect, useState, memo } from 'react';
import dateFormat from 'dateformat';
import {usePrevious} from '../../helpers/usePrevious';
import { MenuItem, Select, InputLabel } from '@material-ui/core';
import styled from 'styled-components';
import CreateDocument from '../../print-document/print-document';
import DisciplineList from '../DisciplineList/DisciplineList';
import HoursList from '../HoursList/HoursList';
import EmployeeService from '../../service/ApiService';

const mapHoursToMultiplier = {
    'ассистент': 180,
    'старший преподаватель': 280,
    'доцент': 380,
    'профессор': 480,
};

const FormGroup = styled.div`
    width: 60%;
`;

function CreateReport() {

    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee]= useState({});
    const [currentDiscipline, setCurrentDiscipline] = useState(null);
    const [hoursInfo, setHoursInfo] = useState([]);
    // eslint-disable-next-line
    const [print, readyToPrint] = useState(false);

    let { 
        employee_id,
        employee_name,
        employee_skill,
        employee_number,
        employee_start
    } = currentEmployee;

    useEffect(() => {
        const fetch = async () => {
            const employees = await EmployeeService.getEmployees()
            setEmployees(employees);
        };

        fetch();
    }, []);

    const employeesItems = employees.map((item) => {
        return (
            <MenuItem 
                key={item.employee_id}
                value={item.employee_name}>
                {item.employee_name}
            </MenuItem>
        );
    });

    const previousEmployeeName = usePrevious(employee_name);
    useEffect(() => {
        if(employee_name !== previousEmployeeName) {
            readyToPrint(false);
        }

    }, [previousEmployeeName, employee_name, readyToPrint]);

    const selectEmployee = useCallback((e) => {
        EmployeeService
            .getEmployee(e.target.value)
            .then((currentEmployee) => setCurrentEmployee(currentEmployee));
    }, [setCurrentEmployee]);

    const employeesList = () => {
        console.log(employees[0]);
        return (
            <FormGroup className="form-group">
                <InputLabel id="employee-simple-select-outlined-label">
                    Сотрудник:
                </InputLabel>
                <Select
                    fullWidth
                    onChange={selectEmployee}
                    labelId="employee-simple-select-outlined-label"
                    id="employee-simple-select-outlined"
                    name="employee"
                    value={employee_name ?? ''}
                >
                    {employeesItems}
                </Select>
            </FormGroup>
        );
    };
    

    let arrayHours = hoursInfo.map(item => item.hours);

    const printDoc = useCallback(() => {
        
        if(hoursInfo.length === 0) {
            return null;
        }
        return (
            <>
                <CreateDocument 
                    name={employee_name}
                    position={employee_skill}
                    contractNumber={employee_number}
                    contractStart={dateFormat(employee_start, 'dd.mm.yyyy')}
                    multiplier={mapHoursToMultiplier[employee_skill]}
                    lecturesHours={arrayHours[0] ?? ''}
                    seminarHours={arrayHours[1] ?? ''}
                    diplomaHours={arrayHours[2] ?? ''}
                    setsHours={arrayHours[3] ?? ''}
                    examsHours={arrayHours[4] ?? ''}
                    consultationHours={arrayHours[5] ?? ''}
                    otherHours={arrayHours[6] ?? ''}
                /> 
            </> 
        );
        
    }, [arrayHours, employee_name, employee_skill, employee_number, employee_start, hoursInfo.length]);

    return (
        <>
            {employeesList()}
             <DisciplineList 
                employee_name={employee_name}
                employee_id={employee_id}
                currentDiscipline={currentDiscipline}
                setCurrentDiscipline={setCurrentDiscipline}
            />
            <HoursList
                employee_id={employee_id ?? null}
                discipline_id={currentDiscipline ?? null}
                throwBackHoursInfo={setHoursInfo}
                readyToPrint={readyToPrint}
            />
            {printDoc()}
        </>
    )
};

export default memo(CreateReport);