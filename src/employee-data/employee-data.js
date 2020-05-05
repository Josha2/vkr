import React, { useReducer } from 'react';
import CreateDocument from '../print-document/print-document';
import ApiService from '../service/employeesApi';
import img from './icon.png';
import './employee-data.css';


export default class Employee extends React.Component {

    apiService = new ApiService();

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
        this.apiService
            .getDiscipline(employee_name)
            .then((disciplines) => {
                this.setState({ disciplines });
            });
    };

    updateDisciplineInfo(id_e, id_d) {
        this.apiService.getDisciplineInfo(id_e, id_d)
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
                <div className="discipline-card" 
                     onClick={() => this.updateDisciplineInfo(employee_id, element.discipline_id)}>
                    <img src={img} alt="" height="28" width="28"/>
                    <p>{ element.discipline_name}</p>
                </div>
            );
        });

        const disciplineType = disciplineHours.map((element, i) => {
            return (
                <li className="list-group-item" key={i}>
                    { element.label } : {element.hours}
                </li>
            );
        });

        let selectDisc = disciplineHours.length === 0 ?
                           null :
                           disciplineType


        const printDoc = this.state.readyToPrint === false ?
                           null :
                           <CreateDocument name={employee_name}
                            position={employee_skill}
                            lecturesValue={multiplier}
                            lecturesHours={arrayHours[0]}
                            seminarValue={multiplier}
                            seminarHours={arrayHours[1]}/>  


        return (
            <>
            <div className="container">
                { disciplineList }
            </div>
            <ul className="comma-list">
                { selectDisc }
            </ul>
            <input type="checkbox" checked={this.state.readyToPrint}
                   onChange={this.handleCheck}> 
            </input>
            {printDoc}
            </>
        );
    };
};

