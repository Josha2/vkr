import React from 'react';

import HistoryTable from './employee-history/employee-history';
import EmployeeList from './employee-list/employee-list';
import EmployeeTable from './employee-table/employee-table';
import './app.css'

export default class App extends React.Component {
    render(){
        return (
            <main className="app">
                    <h1>Приложение формирования справки педагогических и научных работников</h1>
                    <div className="tab-container">
                        <input type="radio" id="tab1" name="tab-control" checked={true} readOnly/>
                        <input type="radio" id="tab2" name="tab-control" readOnly/>
                        <input type="radio" id="tab3" name="tab-control" readOnly/>
                            <ul className="tab-container-list">
                            <li title="create">
                                <label htmlFor="tab1" role="button">
                                    <br/>
                                    <span>Сотрудники</span>
                                </label>
                            </li>
                            <li title="history">
                                <label htmlFor="tab2" role="button">
                                    <br/>
                                    <span>Сформировать отчёт</span>
                                </label>
                            </li>
                            <li title="history2">
                                <label htmlFor="tab3" role="button">
                                    <br/>
                                    <span>История</span>
                                </label>
                            </li>
                            </ul>
                        <div className="content">
                            <section>
                                <h2>Сотрудники</h2>
                                <EmployeeTable/>
                            </section>
                            <section>
                                <h2>Сформировать отчёт</h2>
                                <EmployeeList selectEmployee={this.selectEmployee}/>               
                            </section>
                            <section>
                                <h2>Отчёты</h2>
                                <HistoryTable/>
                            </section>
                        </div>
                    </div>
            </main>
        )
    }
}