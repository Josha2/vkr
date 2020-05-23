import React, {memo} from 'react';

import SelectReport from './components/SelectReport/SelectReport';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import HistoryTable from './components/HistoryTable/HistoryTable';
import AlertState from './common/components/context/alert/AlertState';
import NavBar from './common/components/Navbar';
import Alert from './common/components/Alert';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './app.css'


const App = () => {
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
  );
};

export default memo(App);