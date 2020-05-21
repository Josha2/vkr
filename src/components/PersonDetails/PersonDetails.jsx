import React from 'react';
import { withFormik } from 'formik';
import { TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import dateFormat from 'dateformat';
import styled from 'styled-components';

import './PersonDetails.css';
import img from './1.png';

const Root = styled.div`
    padding: 0.25rem;
`;

const PersonImage = styled.img`
    width: 30%;
    height: 30%;
    border-radius: 10px;
`;

const positionArray = [
    "ассистент",
    "научный сотрудник",
    "старший преподаватель",
    "доцент",
    "профессор",
];

const PersonDetailsLayout = (props) => {
    const {values, handleChange, handleBlur, handleSubmit} = props;

    const menuItems = positionArray.map((item, i) => {
        if (item !== values.position) {
            return <MenuItem value={item}>{item}</MenuItem>
        }
    });

    return (
        <Root className="card">
            <PersonImage  alt="#" src={img}/>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <TextField 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullName}
                                id="outlined-basic"
                                name="fullName"
                                label="ФИО"
                                fullWidth
                            />
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <TextField 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contractNumber}
                                id="outlined-basic"
                                name="fullName"
                                label="Номер договора"
                            />
                        </li>
                        <li className="list-group-item">
                            <InputLabel id="position-simple-select-outlined-label">
                                Должность
                            </InputLabel>
                            <Select
                                onChange={handleChange}
                                value={values.position}
                                labelId="position-simple-select-outlined-label"
                                id="simple-select-outlined"
                                name="position"
                            >
                                <MenuItem value={values.position}>
                                    {values.position}
                                </MenuItem>
                                {menuItems}
                            </Select>
                        </li>
                        {/* <li className="list-group-item">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Начало действия договора"
                                    onChange={handleChange}
                                    value={dateFormat(values.dateStart, 'dd-mm-yyyy')}
                                />
                            </MuiPickersUtilsProvider>
                        </li> */}
                    </ul>
                </form>
            </div>
        </Root>
    );
};

const initialValues = {
    fullName: '', 
    contractNumber: '',
    position: '',
    dateStart: ''
};

const PersonDetailsForm = withFormik({
    mapPropsToValues: ({personInfo}) => (convertPersonalDetailsClientToServer(personInfo) || initialValues),
    handleSubmit: (values) => {
        console.log(values);
    },
})(PersonDetailsLayout);

export default PersonDetailsForm;

const convertPersonalDetailsClientToServer = (data) => {
    return {
        fullName: data.employee_name,
        contractNumber: data.employee_number,
        position: data.employee_skill,
        dateStart: data.employee_start
    }
};