import React from 'react';

import SelectReport from './components/SelectReport/SelectReport';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import HistoryTable from './components/HistoryTable/HistoryTable';
import AlertState from './context/alert/AlertState';
import NavBar from './components/Navbar';
import Alert from './components/Alert';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
                                    <Route path={'/reports'} component={SelectReport}/>
                                    <Route path={'/history'} component={HistoryTable}/>             
                                </Switch>
                            </div>
                    </main>
                </BrowserRouter>
            </AlertState>
        )
    }
}