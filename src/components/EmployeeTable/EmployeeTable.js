import React, { useState, useCallback, useEffect } from 'react';
import dateFormat from 'dateformat';
import AddEmployee from '../AddEmployee/AddEmployee';
import ApiService from '../../service/ApiService';
import AddWorkLoad from '../AddWorkLoad/AddWorkLoad';
import Tabs from '../../tabs/tabs';
import PrintTable from '../PrintTable/PrintTable';
import PersonDetails from '../PersonDetails/PersonDetails.jsx';
import ModalWindow from '../../common/components/ModalWindow';
import EmployeeService from '../../service/ApiService';

import edit from './edit.png';
import questionMark from './questionMark.png';

import PersonHours from '../PersonHours/PersonHours';

const EmployeeTable = () =>  {
    const [setTotal] = useState(0);
    const [currentItem, setCurrentItem] = useState({});
    const [disciplines, setDisciplines] = useState([]);
    // const [currentDiscipline, setCurrentDiscipline] = useState(null);
    // const [hoursInfo, setHoursInfo] = useState([]);
    const [isEditModalOpen, setEditModal] = useState(false);
    const [isInfoModalOpen, setInfoModal] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const disciplines = await EmployeeService.getDiscipline(currentItem.employee_name);
            setDisciplines(disciplines);
        };

        fetch();
    }, [setDisciplines, currentItem.employee_name]);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const discipline = await EmployeeService.getDisciplineInfo(currentItem.employee_name, disciplines[0] && disciplines[0].discipline_id);
    //         setHoursInfo(discipline ?? {});
    //     };

    //     fetch();
    // }, [currentItem.employee_id, disciplines[0], setHoursInfo]);

    // console.log(disciplines[0]);

    const onShowModalEdit = (item) => {
        setCurrentItem(item);
        setEditModal(true);
    };

    const onShowModalInfo = (item) => {
        setCurrentItem(item);
        setInfoModal(true);
    };
    
    const onCloseModal = () => {
        setEditModal(false);
        setInfoModal(false);
    };

    const employeeTable = (                
        <PrintTable
            getData={ApiService.getEmployees}
            setTotal={setTotal} 
            headerTitles={[
                'Изменить', 'Информация', 'Договор',
                'Дата начала договора', 'Дата конца договора',
                'ФИО', 'Факультет', 'Должность']}>
                {(item) => (
                    <>  
                    <td>
                        <img src={edit} alt="" height="25"  width="25" onClick={() => onShowModalEdit(item)}/>
                    </td>
                    <td>
                        <img src={questionMark} alt="" height="25" width="25" onClick={() => onShowModalInfo(item)}/>
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
            <ModalWindow 
                title="Изменить данные" 
                isOpen={isEditModalOpen} 
                onClose={onCloseModal} >
                <PersonDetails personInfo={currentItem ?? {}}/>
            </ModalWindow>

            <ModalWindow 
                title="Информация по дисциплинам" 
                isOpen={isInfoModalOpen} 
                onClose={onCloseModal} >
                <PersonHours 
                    personInfo={currentItem ?? {}}
                    disciplines={disciplines}/>
            </ModalWindow>

            <div className="container pt-2">
                <Tabs>
                    <div label="Сотрудники" className="table-main">
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