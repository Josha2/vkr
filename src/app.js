import React from 'react';

import HistoryTable from './employee-history/employee-history';
import EmployeeList from './employee-list/employee-list';
import EmployeeTable from './employee-table/employee-table';
import NavBar from './components/navbar';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './app.css'


export default class App extends React.Component {
    render(){
        return (
            <Router>
                <main className="app">
                    <NavBar/>
                    <h1>Приложение формирования справки педагогических и научных работников</h1>
                        <div className="container pt-4">
                            <Switch>
                                <Route path={'/'} exact component={EmployeeTable}/>
                                <Route path={'/reports'} component={EmployeeList}/>
                                <Route path={'/history'} component={HistoryTable}/>             
                            </Switch>
                        </div>
                </main>
            </Router>
        )
    }
}