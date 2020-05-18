import React, { useState } from 'react';

import dateFormat from 'dateformat';
import AddEmployee from '../form-add-employee/form-add-employee';
import ApiService from '../service/ApiService';
import AddWorkLoad from '../components/AddWorkLoad/AddWorkLoad';
import Tabs from '../tabs/tabs';
import PrintTable from '../components/PrintTable/PrintTable';

import edit from './edit.png';
import './employee-table.css';
import PersonDetails from '../components/PersonDetails/PersonDetails';

const EmployeeTable = () =>  {

    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setModal] = useState(false);
    const [total, setTotal] = useState(null);

    const showModal = (item) => {
        setCurrentItem(item);
        setModal(true);
    };
    
    const closeModal = () => {
        setModal(false);
    };

    const employeeTable = (                
        <PrintTable
            getData={ApiService.getEmployees}
            setTotal={setTotal} 
            headerTitles={[
                'Изменить', 'Договор',
                'Дата начала договора', 'Дата конца договора',
                'ФИО', 'Факультет', 'Должность']}>
                {(item) => (
                    <>  
                        <td>
                            <img src={edit} alt="" height="25"  width="25" onClick={() => showModal(item)}/>
                        </td>
                        <td>{item.employee_number}</td>
                        <td>{dateFormat(item.employee_start, 'dd-mm-yyyy')}</td>
                        <td>{dateFormat(item.employee_end, 'dd-mm-yyyy')}</td>
                        <td>{item.employee_name}</td>
                        <td>{item.employee_department}</td>
                        <td>{item.employee_skill}</td>
                    </>
                )}
        </PrintTable>
    );

        return (
            <>
            <PersonDetails 
                show={isModalOpen} 
                hide={() => setModal(false)} 
                item={currentItem ?? {}} 
                closeModal={closeModal}
            />
            <div className="container pt-2">
                <Tabs>

                    <div label="Сотрудники" className="table-main" total={` (${total})`}>
                    {employeeTable} 
                    </div>

                    <div label="Добавить сотрудника">
                        <AddEmployee/>
                    </div>

                    <div label="Добавить объем уч.нагрузки">
                        <AddWorkLoad/>
                    </div>
                </Tabs>
            </div>
            </>
        );
};

export default EmployeeTable;