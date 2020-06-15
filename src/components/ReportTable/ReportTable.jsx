import React, { memo, useEffect, useState, useCallback } from 'react';
import EmployeeService from '../../service/ApiService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const mapHoursToMultiplier = {
    'ассистент': 150,
    'научный сотрудник': 300,
    'старший преподаватель': 450,
    'доцент': 600,
    'профессор': 750,
};

const mapAcademicTypeLoadToDescription = {
    lectures: 'Лекции',
    seminar: 'Семинарские (практические) занятия',
    diploma: 'Руководство дипломными (курсовыми) работами',
    sets: 'Зачеты',
    exams: 'Экзамены',
    consultations: 'Консультации',
    other: 'Другая учебная работа'
};

const CustomTextFieldVisible = styled(TextField)`
    div:before {
        border-bottom: 1px solid rgba(0, 0, 0, 5);
    }
    input{    
        padding: 0px;
        text-align: right;
    }
`;

const CustomTextFieldHidden = styled(TextField)`
    div:before {
        border-bottom: 1px solid rgba(0, 0, 0, 0);
    }
    input{    
        padding: 0px;
        text-align: right;
    }
`;

const ReportTable = (props) => {
    const { 
        employee_id, 
        discipline_id, 
        employee_skill, 
        throwBackHoursInfo,
        edit } = props;

    const [hoursInfo, setHoursInfo] = useState([]);

    const insertDisciplineInfo = useCallback((obj) => {
        const newArray = Object.entries(obj).map(([key, value]) => {
            return {
                hours: value, 
                label: mapAcademicTypeLoadToDescription[key]
            }
        });
        setHoursInfo(newArray);
        throwBackHoursInfo(newArray);
    }, [setHoursInfo, throwBackHoursInfo]);

    useEffect(() => {
        const fetch = async () => {
            const discipline = await EmployeeService.getDisciplineInfo(employee_id, discipline_id);
            insertDisciplineInfo(discipline ?? {});
        };

        fetch();
    }, [employee_id, discipline_id, setHoursInfo]);

    const changeValue = (i, e) => {
        const newHoursInfo = [...hoursInfo];
        newHoursInfo[i] = {...newHoursInfo[i], hours: e.target.value}
        setHoursInfo(newHoursInfo);
    };

    const typeOfInput = (value, i) => {
        if (!edit) {
            return  (
                <CustomTextFieldHidden
                    type="number"
                    value={value}
                    disabled
                />
            );
        } 
        return (
                <CustomTextFieldVisible
                    type="number"
                    value={value}
                    onChange={(e) => changeValue(i, e)}
                />
            );
    };

    const tableRows = useCallback(() => {
        return hoursInfo.map((item, i) => {
            let multiplier;
            if (item.hours !== null){
                multiplier = mapHoursToMultiplier[employee_skill]
            } else {
                multiplier = ''
                item.hours = ''
            }
            return (
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {item.label}
                    </TableCell>
                    <TableCell align="right">
                        {multiplier}
                    </TableCell>
                    <TableCell align="right">
                        {typeOfInput(item.hours, i)}
                    </TableCell>
                </TableRow>
            );
        });
    });

    const showTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table" style={{minWidth : 450}}>
                    <TableHead>
                        <TableRow>
                        <TableCell>Вид</TableCell>
                        <TableCell align="right">Стоимость часа руб.</TableCell>
                        <TableCell align="right">Кол-во часов ч.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const showContent = hoursInfo.length === 0 ? null : showTable();
    
    return (
        <>
        {showContent}
        </>
    )
};

export default memo(ReportTable);