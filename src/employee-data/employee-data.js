import React, { useState, useEffect, useCallback } from 'react';

import CreateDocument from '../print-document/print-document';
import EmployeeService from '../service/ApiService';
import img from './icon.png';

import './employee-data.css';

function Employee({ employee_id, employee_name, employee_skill }) {
    const [disciplines, setDisciplines] = useState([]);
    const [disciplineInfo, setDisciplineInfo] = useState({});
    const [disciplineHours, setDisciplineHours] = useState([]);
    const [print, readyToPrint] = useState(true);

    useEffect(() => {
        EmployeeService
            .getDiscipline(employee_name)
            .then(() => setDisciplines(disciplines));
    }, [employee_name, disciplines]);
    
    //---Выводим информацию по определенной дисцеплине у выбранного работника---
    const updateDisciplineInfo = useCallback((id_e, id_d) => {
        EmployeeService
            .getDisciplineInfo(id_e, id_d)
            .then((disciplineInfo) => {
                setDisciplineInfo(disciplineInfo)
                return disciplineInfo
            })
            .then((disciplineInfo) => insertDisciplineInfo(disciplineInfo));
    }, [employee_name, setDisciplineInfo]);

    function editLabel(label){
        switch (label) {
            case 'lectures':
                label = 'Лекции';
                break;
            case 'seminar':
                label = 'Семинарские (практические) занятия';
                break;
            case 'diploma':
                label = 'Руководство дипломными (курсовыми) работами';
                break;
            case 'sets':
                label = 'Зачеты';
                break;
            case 'exams':
                label = 'Экзамены';
                break;
            case 'consultations':
                label = 'Консультации';
                break;
            case 'other':
                label = 'Другая учебная работа';
                break;
            default:
                break;
        }
        return label;
    };

    //---Создаем массив из объекта информация о дисциплине
    const insertDisciplineInfo = useCallback((obj) => {
        let newArray = [];
        for (let prop in obj) {
            newArray.push({hours: obj[prop], label: editLabel(prop)})
        }
        setDisciplineHours(newArray);
    }, [disciplineInfo]);

    const disciplineList = disciplines.map((element, i) => {
        return (
            <div key={i} 
                className="discipline-card" 
                onClick={updateDisciplineInfo(employee_id, element.discipline_id)}>
                <img src={img} alt="" height="28" width="28"/>
                <p>{ element.discipline_name}</p>
            </div>
        );
    });

    const disciplineListInFo = disciplineHours.map((element, i) => {
        return (
            <li className="list-group-item" key={i}>
                { element.label } : {element.hours}
            </li>
        );
    });

    const handleCheck = useCallback((e) => {
        readyToPrint(e.target.checked);
    }, []);

    //---Расчёт стоимости для документа
    let arrayHours = [];
    let multiplier = 0;
        switch (employee_skill) {
            case 'ассистент':
                multiplier = 180;
                break;
            case 'старший преподаватель':
                multiplier = 280;
                break;
            case 'доцент':
                multiplier = 380;
                break;
            case 'профессор':
                multiplier = 480;
                break;
            default:
                break;
        };
        disciplineHours.map((element) => {
            arrayHours.push(element.hours);
        })

    let selectDisc = disciplineHours.length === 0 
                    ? null 
                    : disciplineListInFo

    const printDoc = print === false 
                    ? null 
                    : <CreateDocument name={employee_name}
                        position={employee_skill}
                        lecturesValue={multiplier}
                        lecturesHours={arrayHours[0]}
                        seminarValue={multiplier}
                        seminarHours={arrayHours[1]}/>  

    return (
        <>
            <div className="container">
                {disciplineList}
            </div>
            <ul className="comma-list">
                { selectDisc }
            </ul>
            <input type="checkbox" checked={print}
                   onChange={handleCheck}> 
            </input>
            {printDoc}
        </>
    )
};

export default Employee;