import React from 'react';
import EmployeeApi from '../service/employeesApi';
import dateFormat from 'dateformat';
import './employee-history.css';


export default class HistoryTable extends React.Component {

    history = new EmployeeApi();

    state = {
        history: []
    }

    componentDidMount(){
        this.updateHisory();
    }

    updateHisory = () => {
        this.history.getHistory()
            .then((history) => {
                this.setState(() => {
                    return {
                        history: history
                    }
                })
            })
    }

    render(){
        let { history } = this.state;
        const historyRows = history.map((element, i) => {
            return (
                <tr key={i}>
                    <td className="column1">{element.name}</td>
                    <td className="column2">{dateFormat(element.date, 'dd-mm-yyyy')}</td>
                    <td className="column3">{element.position}</td>
                    <td className="column4">{element.department}</td>
                    <td className="column5">{element.discipline}</td>
                    <td className="column6">{element.total}</td>
                </tr>
            )
        })

        return (
            <div className="table-main">
                <div className="table-head">
                    <table>
                        <thead>
                            <tr className="row-head"> 
                                <th className="column1">ФИО</th>
                                <th className="column2">Дата</th>
                                <th className="column3">Должность</th>
                                <th className="column4">Факультет</th>
                                <th className="column5">Дисциплина</th>
                                <th className="column6">Сумма</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="table-body js-pscroll">
                <table>
                    <tbody>
                        {historyRows}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

