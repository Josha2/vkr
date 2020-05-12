import React from 'react';

import CreateDocument from '../print-document/print-document';
import ApiService from '../service/ApiService';

import './employee-data.css';


export default class Employee1 extends React.Component {
    state = {
        disciplines: [],
        disciplineInfo: {},
        disciplineHours: [],
        readyToPrint: false
    };
    

    componentDidUpdate(prevProps) {
        if (this.props.selectedEmployee !== prevProps.selectedEmployee) {
            this.updateDisciplines();
            this.setState({
                disciplines: [],
                disciplineInfo: {},
                disciplineHours: []
            })
        };
    };
    
    updateDisciplines() {
        let { employee_name } = this.props.selectedEmployee;
        ApiService
            .getDiscipline(employee_name)
            .then((disciplines) => {
                this.setState({ disciplines });
            });
    };

    updateDisciplineInfo(id_e, id_d) {
        ApiService.getDisciplineInfo(id_e, id_d)
            .then((disciplineInfo) => {
                this.setState({
                    disciplineInfo
                });
                return disciplineInfo
            })
            .then((disciplineInfo) => {
                this.insertDisciplineInfo(disciplineInfo);
            })
    };

    editLabel(label) {
        switch (label) {
            case 'lectures':
                label = 'Лекции';
                break;
            case 'seminar':
                label = 'Семинарские (практические) занятия';
                break;
            case 'diploma':
                label = 'Руководство дипломными (курсовыми) работами';
                break;
            case 'sets':
                label = 'Зачеты';
                break;
            case 'exams':
                label = 'Экзамены';
                break;
            case 'consultations':
                label = 'Консультации';
                break;
            case 'other':
                label = 'Другая учебная работа';
                break;
            default:
                break;
        }
        return label;
    };

    insertDisciplineInfo = (obj) => {
        let newArray = [];
        for (let prop in obj) {
           newArray.push({hours: obj[prop], label: this.editLabel(prop)})
        }
        this.setState(() => {
            return {
                disciplineHours: newArray
            }
        })
    };

    handleCheck = (e) => {
        this.setState({ readyToPrint: e.target.checked })
    }

    render(){
        const { disciplines, disciplineHours } = this.state;
        const { employee_id, employee_name, employee_skill } = this.props.selectedEmployee;
        let arrayHours = [];
        let multiplier = 0;
        switch (employee_skill) {
            case 'ассистент':
                multiplier = 180;
                break;
            case 'старший преподаватель':
                multiplier = 280;
                break;
            case 'доцент':
                multiplier = 380;
                break;
            case 'профессор':
                multiplier = 480;
                break;
            default:
                break;
        };
        disciplineHours.map((element, i) => {
            arrayHours.push(element.hours);
        })

        const disciplineList = disciplines.map((element, i) => {
            return (
                    <div className="card bg-light mb-2"
                        key={i}
                        onClick={() => this.updateDisciplineInfo(employee_id, element.discipline_id)}>
                        <div className="card-header">
                            Дисциплина
                        </div>
                        <div className="card-body text-primary">
                            <h5 className="card-title">
                                { element.discipline_name}
                            </h5>
                        </div>
                    </div>
            );
        });

        const disciplineType = disciplineHours.map((element, i) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center" 
                    key={i}>
                    { element.label } 
                    <span class="badge badge-primary badge-pill">{element.hours}</span>
                </li>
            );
        });

        let selectDisc = disciplineHours.length === 0 ?
                           null :
                           disciplineType


        const printDoc = this.state.readyToPrint === false ?
                           null :
                           <CreateDocument 
                                name={employee_name}
                                position={employee_skill}
                                lecturesValue={multiplier}
                                lecturesHours={arrayHours[0]}
                                seminarValue={multiplier}
                                seminarHours={arrayHours[1]}/>  


        return (
            <>
                <div className="card-deck pt-2">
                    { disciplineList }
                </div>
                    <ul className="list-group" style={{'maxWidth' : '550px'}}>
                        <label 
                            className="col-3 col-form-label">
                                Часы:
                        </label>
                        { selectDisc }
                    </ul>
                <input type="checkbox" 
                        className="form-check-input"
                        checked={this.state.readyToPrint}
                        onChange={this.handleCheck}> 
                </input>
                {printDoc}
            </>
        );
    };
};

