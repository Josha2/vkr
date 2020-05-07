import React from 'react';

import HistoryTable from './employee-history/employee-history';
import EmployeeList from './employee-list/employee-list';
import EmployeeTable from './employee-table/employee-table';
import AlertState from './context/alert/AlertState';
import NavBar from './components/Navbar';
import Alert from './components/Alert';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import './app.css'


export default class App extends React.Component {
    render(){
        return (
            <AlertState>
                <BrowserRouter>
                    <main className="app">
                        <NavBar/>
                            <div className="container pt-5">
                                <Alert/>
                                <Switch>
                                    <Route path={'/'} exact component={EmployeeTable}/>
                                    <Route path={'/reports'} component={EmployeeList}/>
                                    <Route path={'/history'} component={HistoryTable}/>             
                                </Switch>
                            </div>
                    </main>
                </BrowserRouter>
            </AlertState>
        )
    }
}