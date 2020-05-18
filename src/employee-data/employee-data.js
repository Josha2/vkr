import React, { useCallback, useEffect, useState, memo } from 'react';

import {usePrevious} from '../helpers/usePrevious';
import CreateDocument from '../print-document/print-document';
import EmployeeService from '../service/ApiService';
import './employee-data.css';

const mapAcademicTypeLoadToDescription = {
    lectures: 'Лекции',
    seminar: 'Семинарские (практические) занятия',
    diploma: 'Руководство дипломными (курсовыми) работами',
    sets: 'Зачеты',
    exams: 'Экзамены',
    consultations: 'Консультации',
    other: 'Другая учебная работа'
};

const mapHoursToMultiplier = {
    'ассистент': 180,
    'старший преподаватель': 280,
    'доцент': 380,
    'профессор': 480,
}

function Employee(props) {
    const {selectedEmployee} = props;
    const {employee_id, employee_name, employee_skill} = selectedEmployee;

    const [disciplines, setDisciplines] = useState([]);
    const [disciplineInfo, setDisciplineInfo] = useState({});
    const [disciplineHours, setDisciplineHours] = useState([]);
    const [print, readyToPrint] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const disciplines = await EmployeeService.getDiscipline(employee_name);
            setDisciplines(disciplines);
        };

        fetch();
    }, [employee_name]);

    const previousEmployeeName = usePrevious(employee_name);
    useEffect(() => {
        if(employee_name !== previousEmployeeName) {
            readyToPrint(false);
        }

    }, [previousEmployeeName, employee_name]);

    //---Создаем массив из объекта информация о дисциплине
    const insertDisciplineInfo = useCallback((obj) => {
        const newArray = Object.entries(obj).map(([key, value]) => {
            return {
                hours: value, 
                label: mapAcademicTypeLoadToDescription[key]
            }
        });

        console.log(newArray)
        setDisciplineHours(newArray);
    }, [setDisciplineHours, employee_name]);

    let arrayHours = disciplineHours.map(item => item.hours);

    //---Выводим информацию по определенной дисцеплине у выбранного работника---
    const updateDisciplineInfo = useCallback(async (id_e, id_d) => {
        const discipline = await EmployeeService.getDisciplineInfo(id_e, id_d);
        setDisciplineInfo(discipline);
        insertDisciplineInfo(discipline);
        readyToPrint(true);
    }, [setDisciplineInfo, employee_name]);

    const disciplineList = disciplines.map((element, i) => {
        return (
            <div className="card bg-light mb-2"
                key={i}
                onClick={() => updateDisciplineInfo(employee_id, element.discipline_id)}>
                <div className="card-header">
                    Дисциплина
                </div>
                <div className="card-body text-primary">
                    <h5 className="card-title">
                        { element.discipline_name}
                    </h5>
                </div>
            </div>
        );
    });

    const disciplineListInFo = disciplineHours.map((element, i) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" 
                key={i}>
                { element.label } 
                <span className="badge badge-primary badge-pill">{element.hours}</span>
            </li>
        );
    });

    const renderPrintDoc = useCallback(() => {
        if(!print) {
            return null;
        }

        return (
            <>
                <ul className="list-group mb-3" style={{'maxWidth' : '600px'}}>
                    <label 
                        className="col-3 col-form-label">
                            Часы:
                    </label>
                    {disciplines.length > 0 ? disciplineListInFo : null}
                </ul>
                <CreateDocument 
                    name={employee_name}
                    position={employee_skill}
                    lecturesValue={mapHoursToMultiplier[employee_skill]}
                    lecturesHours={arrayHours[0] ?? ''}
                    seminarValue={mapHoursToMultiplier[employee_skill]}
                    seminarHours={arrayHours[1] ?? ''}
                /> 
            </> 
        );
    });

    return (
        <>
            <div className="card-deck pt-2">
                {disciplineList}
            </div>
            {renderPrintDoc()}
        </>
    )
};

export default memo(Employee);