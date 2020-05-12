import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [date_start, setDateStart] = useState('');
    const [date_end, setDateEnd] = useState('');
    const [number, setNumber] = useState('');
    const [department] = useState('Факультет инновационных технологий(ФИТ)');
    const [position, setPosition] = useState('ассистент');

    const alert = useContext(AlertContext)

    const submitHandler = e => {
      e.preventDefault();
      alert.show(' Сотрудник успешно добавлен!', 'success');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group pt-2">
                <div className="form-group row">
                    <label 
                        htmlFor="name" 
                        className="col-3 col-form-label">
                            ФИО сотрудника:
                        </label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="name"
                        placeholder="Фамилия Имя Отчество"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="department" 
                        className="col-3 col-form-label">
                            Факультет:
                        </label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="department"
                        value={department}
                        readOnly
                        disabled/>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="position" 
                        className="col-3 col-form-label">
                            Должность:
                    </label>
                    <select 
                        className="form-control"
                        value={position}
                        id="position"
                        onChange={(e) => setPosition(e.target.value)}>
                            <option>aссистент</option>
                            <option>научный сотрудник</option>
                            <option>старший преподаватель</option>
                            <option>доцент</option>
                            <option>профессор</option>
                    </select>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="name" 
                        className="col-3 col-form-label">
                            Номер договора:
                        </label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="name"
                        placeholder="№___/__"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}/>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="date-start" 
                        className="col-5 col-form-label">
                            Начало действия договора:
                    </label>
                    <input 
                        className="form-control" 
                        type="date" 
                        value={date_start}
                        onChange={(e) => setDateStart(e.target.value)}
                        id="date-start"/>
                </div>

                <div className="form-group row">
                    <label 
                        htmlFor="date-end" 
                        className="col-5 col-form-label">
                            Окончание действия договора:
                    </label>
                    <input 
                        className="form-control" 
                        type="date" 
                        value={date_end}
                        onChange={(e) => setDateEnd(e.target.value)}
                        id="date-end"/>
                </div>
                <button  
                    onSubmit={submitHandler}
                    className="btn btn-primary">
                        Добавить
                </button>
            </div>
        </form>
    );
};

export default AddEmployee;