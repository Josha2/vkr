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
import CreateDocument from '../../print-document/print-document';
import dateFormat from 'dateformat';
import LogMenu from '../../common/components/controls/LogMenu';

const mapHoursToMultiplier = {
    'ассистент': 150,
    'научный сотрудник': 300,
    'старший преподаватель': 450,
    'доцент': 600,
    'профессор': 750,
};
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
    color: rgba(79, 157, 221, 1);
    margin-left: 15px;
    margin-top: 10.3px;
    cursor: pointer;
`;

const CustomDownloadIcon = styled(GetAppIcon)`
    color: rgba(79, 157, 221, 0.50);
    margin-top: 12.4px;
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
    margin-right: -50px;
`;


const Report = (props) => {
    const { panelId, deleteItem } = props;
    const [expanded, setExpanded] = useState(''); 
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee]= useState({});
    const [disciplines, setDisciplines] = useState([]);
    const [disciplineName, setDisciplineName] = useState('');
    const [currentDiscipline, setCurrentDiscipline] = useState(null);
    const [hoursInfo, setHoursInfo] = useState([]);
    const [edit, setEdit] = useState(false);
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

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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

    useEffect(() => {
        const fetch = async () => {
            const data = await EmployeeService.getDisciplineName(currentDiscipline)
            setDisciplineName(data[0] && data[0].discipline_name);
        };

        fetch();
    }, [setDisciplineName, currentDiscipline]);

    let arrayHours = hoursInfo.map(item => item.hours);
    const printDoc = useCallback(() => {
        if(hoursInfo.length !== 0 && disciplineName !== undefined) {
            return (
                <>
                    <CreateDocument 
                        name={employee_name}
                        position={employee_skill}
                        contractNumber={employee_number}
                        contractStart={dateFormat(employee_start, 'dd.mm.yyyy')}
                        disciplineName={disciplineName}
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
        }
        return <CustomDownloadIcon fontSize="default" />
        
    }, [arrayHours, employee_name, employee_skill, employee_number, employee_start, hoursInfo.length, disciplineName]);
    
    return (
        <ExpansionPanel expanded={expanded === `panel${panelId}`} onChange={handleChange(`panel${panelId}`)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-label="Expand"
                aria-controls={`panel${panelId}-content`}
                id={`panel${panelId}-header`}
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
                            control={printDoc()}
                        />
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={<CustomDeleteIcon fontSize="default" onClick={() => deleteItem(panelId)}/>}
                        />
                        <FormControlLabel
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            control={<LogMenu setEdit={setEdit} edit={edit}/>}
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
                    edit={edit}  
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Report;