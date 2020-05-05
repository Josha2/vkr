import React from 'react';
import ApiService from '../service/employeesApi';
import Employee from '../employee-data/employee-data';
import './employee-list.css';
export default class EmployeeList extends React.Component {
    
    apiService = new ApiService();
    
    state = {
        employees: [],
        selectedEmployee: {},
        loading: true,
    };

    componentDidMount() {
        this.apiService.getEmployees()
        .then((employees) =>{
            this.setState({
                employees,
                loading: false
            });
        });
    };
    
    renderItems(arr) {
        return arr.map((item) => {
            return (
                <option key={item.employee_id}>
                    {item.employee_name}
                </option>
            );
        });
    };

    selectEmployee = (e) => {
        this.apiService
            .getEmployee(e.target.value)
            .then((selectedEmployee) => {
                this.setState({ selectedEmployee });
            });
        };

    render() {
        if(this.state.loading) {
            return <div>Loading...</div>
        }

        let employeeInfo = Object.keys(this.state.selectedEmployee).length === 0 ?
                           <p>Выберете сотрудника!</p> :
                           <Employee selectedEmployee={this.state.selectedEmployee}/>  

        const employeesList = this.renderItems(this.state.employees);
        return (
            <div className="container-list">
                <select className="custom-select"
                onClick={this.selectEmployee}>
                    { employeesList }
                </select> 
                {employeeInfo}
            </div>
        )

    };
};