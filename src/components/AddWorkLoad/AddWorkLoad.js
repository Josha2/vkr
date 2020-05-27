import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../common/components/context/alert/alertContext';
import EmployeeService from '../../service/ApiService';

const mapAcademicHours = [
    {
        label: 'Лекции:',
        value: 'lectures'
    },
    {
        label: 'Семинарские/Практические:',
        value: 'seminar'
    },
    {
        label: 'Дипломные/Курсовые:',
        value: 'diploma'
    },
    {
        label: 'Зачеты:',
        fovaluer: 'sets'
    },
    {
        label: 'Экзамены:',
        value: 'exams'
    },
    {
        label: 'Консультации:',
        value: 'consultations'
    },
    {
        label: 'Другое:',
        value: 'other'
    },
];

const AddWorkLoad = () => {
    const alert = useContext(AlertContext);

    const defaultState = {
        lectures: '',
        seminar: '',
        diploma: '',
        sets: '',
        exams: '',
        consultations: '',
        other: '',
        disciplines: [],
        employees: []
    };

    const [form, setForm] = useState(defaultState);

    useEffect(() => {
        const fetch = async () => {
            const employees = await EmployeeService.getEmployees();
            const disciplines = await EmployeeService.getDisciplines();
            setForm({...defaultState, employees, disciplines});
        };

        fetch();
        // eslint-disable-next-line
    }, []);

    const disciplinesList = form.disciplines.map((item) => {
        return (
            <option key={item.discipline_id}>
                {item.discipline_name}
            </option>
        );
    });

    const employeesList = form.employees.map((item) => {
        return (
            <option key={item.employee_id}>
                {item.employee_name}
            </option>
        );
    });

    const inputAcademicHours = mapAcademicHours.map((item, i) => {
        return (
            <div className="form-group row" key={i}>
                <label htmlFor={item.value} className="col-sm-2 col-form-label">
                    {item.label}
                </label>
                <div className="col-sm-10">
                    <input
                        type="text" 
                        className="form-control form-control-sm"
                        style={{width: 120}}
                        id={item.value}
                        onChange={(e) => setForm({...defaultState, [item.value]: e.target.value})}/>
                </div>
            </div>
        );
    });

    const submitHandler = e => {
        e.preventDefault();
        alert.show(' Учебная нагрузка успешно добавлена!', 'success');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group pt-2">
            <div className="form-group row">
                    <label 
                        htmlFor="employees" 
                        className="col-3 col-form-label">
                            Выберите сотрудника:
                    </label>
                    <select 
                        className="form-control"
                        id="employees"
                        onChange={(e) => {}}>
                            {employeesList}
                    </select>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="disciplines" 
                        className="col-3 col-form-label">
                            Выберите учебную дисциплину:
                    </label>
                    <select 
                        className="form-control"
                        id="disciplines"
                        onChange={(e) => {}}>
                            {disciplinesList}
                    </select>
                </div>
                <label className="col-form-label">
                        Введите часы:
                </label>
                {inputAcademicHours}
                <button  
                    onSubmit={submitHandler}
                    className="btn btn-primary">
                        Добавить
                </button>
                </div>
        </form>
    );
};

export default AddWorkLoad;