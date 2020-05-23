import React, { useContext, useState } from 'react';
import { AlertContext } from '../common/components/context/alert/alertContext';

const AddEmployee = () => {

    const defaultState = {
        name: '',
        date_start: '',
        date_end: '',
        number: '',
        department: 'Факультет инновационных технологий(ФИТ)',
        position: 'ассистент',
    };

    const [form, setForm] = useState(defaultState);

    const alert = useContext(AlertContext);

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
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})} />
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
                        value={form.department}
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
                        value={form.position}
                        id="position"
                        onChange={(e) => setForm({...form, position: e.target.value})}>
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
                        value={form.number}
                        onChange={(e) => setForm({...form, number: e.target.value})} />
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
                        value={form.date_start}
                        onChange={(e) => setForm({...form, date_start: e.target.value})}
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
                        value={form.date_end}
                        onChange={(e) => setForm({...form, date_end: e.target.value})}
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