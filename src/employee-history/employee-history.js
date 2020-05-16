import React from 'react';

import ApiService from '../service/ApiService';
import dateFormat from 'dateformat';
import { PaginationHistory } from '../components/PaginationsHistory';

import search from './search.png';
import question from './question.png';
import './employee-history.css';



export default class HistoryTable extends React.Component {

    state = {
        history: [],
        currentPage: 1,
        employeesPerPage: 6,
        term: '',
        loading: true
    }

    componentDidMount(){
        this.updateHisory();
    }

    updateHisory = () => {
        ApiService.getHistory()
            .then((history) => {
                this.setState(() => {
                    return {
                        history: history
                    }
                })
            })
    }

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
            return element.name
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    render(){
        let { history, term } = this.state;
        const visibleEmployees = this.search(history, term);

        const indexOfLastEmployee = this.state.currentPage * this.state.employeesPerPage;
        const IndexOfFirstEmployee = indexOfLastEmployee - this.state.employeesPerPage;
        const currentEmployees = visibleEmployees.slice(IndexOfFirstEmployee, indexOfLastEmployee);

        const historyRows = currentEmployees.map((element, i) => {
            return (
                <tr key={i}>
                    <td className="column1-history">{element.name}</td>
                    <td className="column2-history">{element.department}</td>
                    <td className="column3-history">{element.position}</td>
                    <td className="column4-history">{element.type}</td>
                    <td className="column5-history">
                        {element.total}{'  '}<img src={question} className="question_mark" alt="" height="18" width="12"></img>
                    </td>
                    <td className="column6-history">
                        {dateFormat(element.date, 'dd-mm-yyyy')}
                    </td>
                </tr>
            );
        });

        return (
            <div className="container pt-2">
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
                <table className="table-history">
                    <thead>
                        <tr> 
                            <th className="column1-history">ФИО</th>
                            <th className="column2-history">Факультет</th>
                            <th className="column3-history">Должность</th>
                            <th className="column4-history">Тип</th>
                            <th className="column5-history">Сумма</th>
                            <th className="column6-history">Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyRows}
                    </tbody>
                </table>
                <PaginationHistory 
                            employeesPerPage={this.state.employeesPerPage} 
                            totalPages={visibleEmployees.length}
                            currentEmployees={currentEmployees}
                            currentPage={this.state.currentPage}
                            paginate={this.paginate}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}/>
            </div>
        );
    };
};

