import React, { memo, useEffect, useState, useCallback } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import EmployeeService from '../../service/ApiService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MenuItem, Select, InputLabel, FormGroup } from '@material-ui/core';
import styled from 'styled-components';
import {usePrevious} from '../../helpers/usePrevious';
import ReportTable from '../ReportTable/ReportTable';

const CustomFormControl = styled(FormControl)`
    width: 350px;
`;

const CustomSelect = styled(Select)`
    margin: 0 16px;
`;

const CustomLabel = styled(InputLabel)`
    margin-left: 16px;
`;

const CustomDeleteIcon = styled(DeleteIcon)`
    color: rgba(0, 0, 0, 0.54);
    margin-left: 15px;
    margin-top: 8px;
    cursor: pointer;
`;

const CustomDownloadIcon = styled(GetAppIcon)`
    color: rgba(0, 0, 0, 0.10);
    margin-top: 12px;
    cursor: pointer;
`;

const FormContent = styled.div`
    display: flex;
    min-width: 985px;

`;

const SelectInputs = styled.div`
    flex-grow: 1;

`;

const ActionIcons = styled.div`
    display: flex;
    align-items: center;
`;


const Report = () => {
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee]= useState({});
    const [disciplines, setDisciplines] = useState([]);
    const [currentDiscipline, setCurrentDiscipline] = useState(null);
    const [hoursInfo, setHoursInfo] = useState([]);
    // eslint-disable-next-line
    const [print, readyToPrint] = useState(false);
    const { 
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

    const selectEmployee = useCallback((e) => {
        EmployeeService
            .getEmployee(e.target.value)
            .then((currentEmployee) => setCurrentEmployee(currentEmployee));
    }, [setCurrentEmployee]);

    const employeesItems = employees.map((item) => {
        return (
            <MenuItem 
                key={item.employee_id}
                value={item.employee_name}>
                {item.employee_name}
            </MenuItem>
        );
    });

    const employeesList = () => {
        return (
            <CustomFormControl className="form-group">
                <CustomLabel id="employee-simple-select-label">
                    Сотрудник:
                </CustomLabel>
                <CustomSelect
                    labelId="employee-simple-select-label"
                    id="employee-simple-select"
                    value={employee_name ?? ''}
                    onChange={selectEmployee}
                >
                    {employeesItems}
                </CustomSelect>
            </CustomFormControl>
        );
    };

    //-----------------------------------------------------------------------
    useEffect(() => {
        const fetch = async () => {
            const disciplines = await EmployeeService.getDiscipline(employee_name);
            setDisciplines(disciplines);
        };

        fetch();
    }, [setDisciplines, employee_name]);

    const selectDiscipline = useCallback((e) => {
        setCurrentDiscipline(e.target.value);
    }, [setCurrentDiscipline]);

    const disciplinesItems = disciplines.map((item) => {
        return (
            <MenuItem 
                key={item.discipline_id}
                value={item.discipline_id}>
                {item.discipline_name}
            </MenuItem>
        );
    });
    const disciplineList = () => {
        // let currentValue = '';
        // if(employee_name !== '' && disciplines.length === 0){
        //     currentValue = 'Дисциплины отсутствуют😢'
        // } else {
        //     currentValue = currentDiscipline
        // }
        return (
            <FormControl className="form-group" style={{width: 350}}>
                <InputLabel id="discipline-simple-select-label">
                    Дисциплина:
                </InputLabel>
                <Select
                    labelId="discipline-simple-select-label"
                    id="discipline-simple-select"
                    value={currentDiscipline ?? ''}
                    onChange={selectDiscipline}
                >
                    {disciplinesItems}
                </Select>
            </FormControl>
        );
    };
    
    const previousEmployeeName = usePrevious(employee_name);
    useEffect(() => {
        if(employee_name !== previousEmployeeName) {
            setCurrentDiscipline(null);
        }

    }, [previousEmployeeName, employee_name]);

    const hasContent = hoursInfo.length === 0 ? false : true;

    const expandIcon = hoursInfo.length === 0
        ? <ExpandMoreIcon 
            style={{
                color: 'rgba(0, 0, 0, 0.10)',
                cursor: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            />
        : <ExpandMoreIcon/>;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={expandIcon}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
            >
                <FormContent>
                    <SelectInputs>
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={employeesList()}
                        />
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={disciplineList()}
                        />
                    </SelectInputs>
                    <ActionIcons>
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={<CustomDownloadIcon fontSize="medium"/>}
                        />
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={<CustomDeleteIcon fontSize="medium"/>}
                        />
                    </ActionIcons>
                </FormContent>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ReportTable
                    employee_id={employee_id ?? null}    
                    employee_skill={employee_skill ?? null}    
                    discipline_id={currentDiscipline ?? null}
                    throwBackHoursInfo={setHoursInfo}    
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Report;