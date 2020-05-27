import { MenuItem, TextField, Button } from '@material-ui/core';
import { withFormik } from 'formik';
import React, { memo } from 'react';
import styled from 'styled-components';
import InputField from '../../common/components/controls/InputField';
import SelectField from '../../common/components/controls/SelectField';
import * as yup from 'yup';


import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import img from './1.png';
import './PersonDetails.css';

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
    const { values, errors, handleSubmit, handleChange } = props;

    const menuItems = positionArray.map((item, i) => {
        if (item !== values.position) {
            return <MenuItem value={item} key={i}>{item}</MenuItem>
        }

        return null;
    });

    return (
        <Root className="card">
            <PersonImage alt="#" src={img} />
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <InputField 
                                name="fullName" 
                                label="ФИО" 
                                fullWidth
                            />
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <InputField 
                                name="contractNumber" 
                                label="Номер договора"
                            />
                        </li>
                        <li className="list-group-item">
                            <SelectField 
                                name="position"
                                label="Должность"
                                labelId="simple-select-helper-label"
                                id="simple-select-helper"
                                items={menuItems}
                            />
                        </li>
                        <li className="list-group-item">
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    id="1-date-picker-inline"
                                    name="dateStart"
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Начало действия договора"
                                    onChange={handleChange}
                                    value={values.dateStart}
                                />
                            </MuiPickersUtilsProvider> */}
                            <TextField
                                id="date-1"
                                label="Начало действия"
                                type="date"
                                name="dateStart"
                                defaultValue={values.dateStart}
                                onChange={handleChange}
                            />
                        </li>
                        <li className="list-group-item">
                            <TextField
                                id="date-2"
                                label="Окончания действия"
                                type="date"
                                name="dateEnd"
                                defaultValue={values.dateEnd}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <Button
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        onSubmit={handleSubmit}>
                        Подтвердить
                    </Button>
                </form>
            </div>
        </Root>
    );
};

const initialValues = {
    fullName: '',
    contractNumber: '',
    position: '',
    dateStart: '',
    dateEnd: ''
};

const validationSchema = yup.object().shape({
    fullName: yup
        .string()
        .min(3, "ФИО слишком короткое")
        .max(45, "ФИО слишком длинное")
});

const PersonDetailsForm = withFormik({
    validationSchema,
    mapPropsToValues: ({ personInfo }) => (convertPersonalDetailsClientToServer(personInfo) || initialValues),
    handleSubmit: (values) => {
        console.log(values);
    }
})(PersonDetailsLayout);

export default memo(PersonDetailsForm);

const convertPersonalDetailsClientToServer = (data) => {
    return {
        fullName: data.employee_name,
        contractNumber: data.employee_number,
        position: data.employee_skill,
        dateStart: data.employee_start,
        dateEnd: data.employee_end
    }
};