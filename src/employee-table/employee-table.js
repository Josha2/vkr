import React from 'react';

import dateFormat from 'dateformat';
import { Pagination } from '../components/Paginations';
import PopUp from '../components/PopUp';
import AddEmployee from '../form-add-employee/form-add-employee';
import ApiService from '../service/ApiService';
import AddWorkLoad from '../components/AddWorkLoad/AddWorkLoad';
import Tabs from '../tabs/tabs';


import edit from './edit.png';
import './employee-table.css';
import search from './search.png';


export default class EmployeeTable extends React.Component {

    state = {
        employees: [],
        currentPage: 1,
        employeesPerPage: 6,
        term: '',
        loading: true,
        isOpenModal: false,
        currentItem: null
    };

    componentDidMount() {
        ApiService.getEmployees()
            .then((employees) =>{
                this.setState({
                    employees,
                    loading: false
                });
            });

    };

    paginate = (currentPage) => {
        this.setState({
            currentPage
        });
    };

    nextPage = (currentEmployees) => {
        if(currentEmployees.length > 5){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        };
    };

    prevPage = (currentPage) => {
        if(currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        };
    };

    search = (arr, term) => {
        if (term.length === 0){
            return arr;
        }

        return arr.filter((element) => {
            return element.employee_name
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    showModal = (item) => {
        this.setState({
            currentItem: item,
            isOpenModal: true
        });

    }
    
    closeModal = () => {
        this.setState({isOpenModal: false})
    }

    render(){
        let { employees, term, isOpenModal: modal } = this.state;
        const visibleEmployees = this.search(employees, term);

        const indexOfLastEmployee = this.state.currentPage * this.state.employeesPerPage;
        const IndexOfFirstEmployee = indexOfLastEmployee - this.state.employeesPerPage;
        const currentEmployees = visibleEmployees.slice(IndexOfFirstEmployee, indexOfLastEmployee);


        const employeesRows = currentEmployees.map((item, i) => {
            return (
                <>
                <tr key={i}>
                    <td className="column0-employee">
                        <img 
                            onClick={() => this.showModal(item)}
                            src={edit} 
                            alt="" 
                            height="25" 
                            width="25"/>
                    </td>
                    <td className="column1-employee">{item.employee_number}</td>
                    <td className="column2-employee">{dateFormat(item.employee_start, 'dd-mm-yyyy')}</td>
                    <td className="column3-employee">{dateFormat(item.employee_end, 'dd-mm-yyyy')}</td>
                    <td className="column4-employee">{item.employee_name}</td>
                    <td className="column5-employee">{item.employee_department}</td>
                    <td className="column6-employee">{item.employee_skill}</td>
                </tr>
                </>
            )
        })

        return (
            <>
            <PopUp 
                show={this.state.isOpenModal} 
                hide={() => this.setState({ modal: false})} 
                data={this.state.currentItem} 
                closeModal={this.closeModal}
            />
            <div className="container pt-2">
                <Tabs>
                    <div className="table-main-employee" label="Список" total={` (${visibleEmployees.length})`}>
                        <div className="input-group mt-2" style={{'width': '250px'}}>
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <img src={search} alt="" height="20" width="20"/>
                            </span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="поиск по ФИО"
                                style={{'width': '150px'}}
                                onChange={(e) => this.setState({ term: e.target.value, currentPage: 1 })}/>
                        </div>
                        <table className="table-employee">
                            <thead>
                                <tr> 
                                    <th>Изменить</th>
                                    <th>Договор</th>
                                    <th>Дата начала договора</th>
                                    <th>Дата конца договора</th>
                                    <th>ФИО</th>
                                    <th>Факультет</th>
                                    <th>Должность</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeesRows}
                            </tbody>
                        </table>
                        <Pagination 
                            employeesPerPage={this.state.employeesPerPage} 
                            totalPages={visibleEmployees.length}
                            currentEmployees={currentEmployees}
                            currentPage={this.state.currentPage}
                            paginate={this.paginate}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}/>
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
        )
    }
}