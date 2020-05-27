import React, { memo } from 'react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import { MenuItem, TextField, Button } from '@material-ui/core';
import dateFormat from 'dateformat';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../../common/components/controls/InputField';
import SelectField from '../../common/components/controls/SelectField';
import EmployeeService from '../../service/ApiService';
import {
    MuiPickersUtilsProvider,
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
    const { values, isValid, handleSubmit, setFieldValue } = props;

    const menuItems = positionArray.map((item, i) => {
        if (item !== values.position) {
            return <MenuItem value={item} key={i}>{item}</MenuItem>
        }

        return null;
    });

    const handleDateStartChange = (date) => {
        setFieldValue('dateStart', date);
    };

    const handleDateEndChange = (date) => {
        setFieldValue('dateEnd', date);
    };

    return (
        <Root className="card">
            <PersonImage alt="#" src={img} />
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between flex-column">
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
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk
                                    inputProps={{readOnly: true}}
                                    id="1-date-picker-inline"
                                    name="dateStart"
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Начало действия"
                                    value={values.dateStart}
                                    onChange={handleDateStartChange}
                                />
                            </MuiPickersUtilsProvider>
                        </li>
                        <li className="list-group-item">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk
                                    inputProps={{readOnly: true}}
                                    id="2-date-picker-inline"
                                    name="dateEnd"
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Окончание действия"
                                    value={values.dateEnd}
                                    onChange={handleDateEndChange}
                                />
                            </MuiPickersUtilsProvider>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            disabled={!isValid}
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            onSubmit={handleSubmit}>
                            Подтвердить
                        </Button>
                    </div>
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
        .required('Поле обязательно к заполнению'),
});

const PersonDetailsForm = withFormik({
    mapPropsToValues: ({ personInfo }) => (convertPersonalDetailsClientToServer(personInfo) || initialValues),
    validationSchema,
    handleSubmit: ({fullName, position, contractNumber, dateStart, dateEnd, id}) => {
        EmployeeService
            .updateEmployee(
                fullName, 
                position, 
                contractNumber, 
                dateFormat(dateStart, 'yyyy-mm-dd'), 
                dateFormat(dateEnd, 'yyyy-mm-dd'), 
                id)
    }
})(PersonDetailsLayout);

export default memo(PersonDetailsForm);

const convertPersonalDetailsClientToServer = (data) => {
    return {
        fullName: data.employee_name,
        contractNumber: data.employee_number,
        position: data.employee_skill,
        dateStart: data.employee_start,
        dateEnd: data.employee_end,
        id: data.employee_id
    }
};