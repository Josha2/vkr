import React, { useEffect, useState, memo } from 'react';
import { InputLabel } from '@material-ui/core';
import EmployeeService from '../../service/ApiService';
import './DisciplineList.css';

const DisciplineList = (props) => {
    const { 
        employee_name,
        currentDiscipline, 
        setCurrentDiscipline
    } = props;

    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const disciplines = await EmployeeService.getDiscipline(employee_name);
            setDisciplines(disciplines);
        };

        fetch();
    }, [employee_name]);

    const disciplineList = disciplines.map((item, i) => {
        let classNameBody = "card-body";
        if(currentDiscipline === item.discipline_id){
            classNameBody += " selected";
        } 
        return (
            <div className="card bg-light mb-2"
                key={i}
                onClick={() => setCurrentDiscipline(item.discipline_id)}>
                <div className={classNameBody}>
                    <h5 className="card-title">
                        { item.discipline_name}
                    </h5>
                </div>
            </div>
        );
    });

    const showWarning = () => {
        return (
            <div className="alert alert-warning" role="alert">
                Дисциплины отсутствуют
                <span role="img">
                    😢
                </span>
            </div>
        );
    };

    const showList = () => {
        return (
            <>
                <InputLabel>
                Дисциплина:
                </InputLabel>
                <div className="card-deck pt-2 mb-2">
                    {disciplineList}
                </div>
            </>
        );
    };

    const showContent = disciplines.length === 0 ? showWarning() : showList();

    return (
        <div>
            { showContent }
        </div>
    );
};


export default memo(DisciplineList);