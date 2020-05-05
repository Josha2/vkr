import React from 'react';
import './table-data.css';

export default class TableData extends React.Component {
    
    state = {
        typeOfDuty: [
            {
                name: 'Лекции',
                class: 'lectures',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Семинарские (практические) занятия',
                class: 'seminar',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Руководство дипломными (курсовыми) работами',
                class: 'diploma',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Зачеты',
                class: 'sets',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Экзамены',
                class: 'exams',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Консультации',
                class: 'consultations',
                price: '',
                hours: '',
                total: ''
            },
            {
                name: 'Другая учебная работа',
                class: 'other',
                price: '',
                hours: '',
                total: ''
            }
        ]
    }

    countPrice = (e, i) => {
        const value = e.target.value;
        const typeOfDuty = [...this.state.typeOfDuty]
        typeOfDuty[i] = {...typeOfDuty[i], price: value}
        this.setState({ typeOfDuty });
    };

    countHours = (e, i) => {
        const value = e.target.value;
        const typeOfDuty = [...this.state.typeOfDuty]
        typeOfDuty[i] = {...typeOfDuty[i], hours: value}
        this.setState({ typeOfDuty });
    };

    render(){
        const { typeOfDuty } = this.state;
        const Rows = typeOfDuty.map((row, i) => {
            let sum = row.price * row.hours
            return (
                <tr key={i} className={row.class}>
                    <td>{row.name}</td>
                    <td>
                        <input type="text"
                               value={row.price}
                               onChange={(value) => this.countPrice(value, i)}
                               >
                        </input>
                    </td>
                    <td>
                        <input type="text"
                               value={row.hours}
                               onChange={(value) => this.countHours(value, i)}
                               >
                        </input>
                    </td>
                    <td className="total">
                        {sum}
                    </td>
                </tr>
            )
        })
        return (
        <table className="tftable fade-in" border="1">
            <tbody>
                <tr>
                    <th>Вид учебной нагрузки</th>
                    <th>Стоимость<br/>1часа/1работы</th>
                    <th>Кол-во<br/>часов/работ</th>
                    <th>Всего,<br/>руб.</th>
                </tr>
                {Rows}
                <tr className="total">
                    <td>ВСЕГО</td>
                    <td>Row:1 Cell:1</td>
                    <td>Row:1 Cell:1</td>
                    <td>Row:1 Cell:1</td>
                </tr>
            </tbody>
        </table>
        )
    }
}