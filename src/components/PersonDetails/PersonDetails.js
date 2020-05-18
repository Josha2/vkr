import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import dateFormat from 'dateformat';

import './PersonDetails.css';
import img from './1.png';


const PopUp = (props) => {
    const {show, item, closeModal} = props;
    const { employee_name, employee_skill, employee_department, 
            employee_number, employee_start, employee_end } = item;
    // const test = [
    //     {
    //         label: 'ФИО',
    //         value: item.employee_name
    //     },
    //     {
    //         label: 'Факультет',
    //         value: item.employee_department
    //     },
    //     {
    //         label: 'Должность',
    //         value: item.employee_skill
    //     },
    //     {
    //         label: 'Договор',
    //         value: item.employee_number
    //     },
    //     {
    //         label: 'Дата начала',
    //         value: item.employee_start
    //     },
    //     {
    //         label: 'Дата конца',
    //         value: item.employee_end
    //     },
    // ];
   
    // const dataRows = test.map((item, i) => {
    //     return (
    //         <div className="input-group-append" key={i}>
    //             <span className="input-group-text" id={`basic-addon${i}`}>
    //                 {item.label}
    //             </span>
    //             <input 
    //                 type="text" 
    //                 className="form-control" 
    //                 placeholder={item.value}
    //                 aria-describedby={`basic-addon${i}`}/>
    //         </div>
    //     );
    // });

    return (

        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить данные</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="person-details card">
                    <img className="person-image" alt="#" src={img}/>
                    <div className="card-body">
                        <h4>{employee_name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="term">Факультет:</span>
                                <span>{employee_department}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="term">Должность:</span>
                                <span>{employee_skill}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="term">Номер договора:</span>
                                <span>{employee_number}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="term">Дата начала:</span>
                                <span>{dateFormat(employee_start, 'dd-mm-yyyy')}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="term">Дата окончания:</span>
                                <span>{dateFormat(employee_end, 'dd-mm-yyyy')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Отмена
                    </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUp;