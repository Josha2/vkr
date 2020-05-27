import React, { useCallback, useEffect, useState, memo, } from 'react';
import EmployeeService from '../../service/ApiService';
import { InputLabel } from '@material-ui/core';

import './HoursList.css';

const mapAcademicTypeLoadToDescription = {
    lectures: 'Лекции',
    seminar: 'Семинарские (практические) занятия',
    diploma: 'Руководство дипломными (курсовыми) работами',
    sets: 'Зачеты',
    exams: 'Экзамены',
    consultations: 'Консультации',
    other: 'Другая учебная работа'
};

const HoursList = (props) => {
    const { 
        employee_id, 
        discipline_id, 
        throwBackHoursInfo
    } = props;

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
    }, [employee_id, discipline_id, insertDisciplineInfo]);

    const hoursInFoList = hoursInfo.map((item, i) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" 
                key={i}>
                { item.label } 
                <span className="badge badge-primary badge-pill">
                    {item.hours}
                </span>
            </li>
        );
    });

    const showList = () => {
        return (
            <>
                <InputLabel>
                    Часы:
                </InputLabel>
                <ul className="list-group mb-3" style={{maxWidth : 600}}>
                    {hoursInFoList}
                </ul>
            </>
        );
    };

    const showContent = hoursInfo.length === 0 ? null : showList();

    return (
        <>
            { showContent }
        </>
    );

};

export default memo(HoursList);