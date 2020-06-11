import React, { memo, useEffect, useState, useCallback } from 'react';
import EmployeeService from '../../service/ApiService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const mapHoursToMultiplier = {
    'ассистент': 150,
    'старший преподаватель': 300,
    'доцент': 450,
    'профессор': 600,
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

const ReportTable = (props) => {
    const { 
        employee_id, 
        discipline_id, 
        employee_skill, 
        throwBackHoursInfo } = props;

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

    const tableRows = hoursInfo.map((item, i) => {
        let multiplier;
        if (item.hours !== null){
            multiplier = mapHoursToMultiplier[employee_skill]
        } else {
            multiplier = ''
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
                    {item.hours}
                </TableCell>
            </TableRow>
        )
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
                        {tableRows}
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