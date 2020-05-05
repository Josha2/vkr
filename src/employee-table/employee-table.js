import React from 'react';

import ApiService from '../service/employeesApi';
import dateFormat from 'dateformat';
import Tabs from '../tabs/tabs';
import edit from './edit.png';
import './employee-table.css';

export default class EmployeeTable extends React.Component {
    apiService = new ApiService();

    state = {
        employees: [],
    }

    componentDidMount() {
        this.apiService.getEmployees()
        .then((employees) =>{
            this.setState({
                employees,
                loading: false
            });
        });

    };

    render(){
        let { employees } = this.state;
        const employeesRows = employees.map((element, i) => {
            return (
                <tr key={i}>
                    <td className="column0-employee"><img src={edit} alt="" height="25" width="25"/></td>
                    <td className="column1-employee">{element.employee_number}</td>
                    <td className="column2-employee">{dateFormat(element.employee_start, 'dd-mm-yyyy')}</td>
                    <td className="column3-employee">{dateFormat(element.employee_end, 'dd-mm-yyyy')}</td>
                    <td className="column4-employee">{element.employee_name}</td>
                    <td className="column5-employee">{element.employee_department}</td>
                    <td className="column6-employee">{element.employee_skill}</td>
                </tr>
            )
        })

        return (
            <Tabs>
                <div className="table-main-employee" label="Список">
                    <table className="table-employee">
                            <thead>
                                <tr> 
                                    <th>Изменить</th>
                                    <th>Договор</th>
                                    <th>Дата начала договора</th>
                                    <th>Дата конца договора</th>
                                    <th>Контактное лицо</th>
                                    <th>Факультет</th>
                                    <th className="column6-employee">Должность</th>
                                </tr>
                            </thead>
                        <tbody>
                            {employeesRows}
                        </tbody>
                    </table>
                </div>

                <div label="Добавить">
                    <p>COCK COCK COCK COCK COCK COCK COCK COCK COCK COCK COCK COCK </p>
                </div>
            </Tabs>
        )
    }
}