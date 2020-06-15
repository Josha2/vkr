import React, { memo, useContext } from 'react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { AlertContext } from '../../common/components/context/alert/alertContext';
import * as yup from 'yup';
import { MenuItem, Button } from '@material-ui/core';
import dateFormat from 'dateformat';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../../common/components/controls/InputField';
import SelectField from '../../common/components/controls/SelectField';
import EmployeeService from '../../service/ApiService';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const positionArray = [
    "ассистент",
    "научный сотрудник",
    "старший преподаватель",
    "доцент",
    "профессор",
];

const Text = styled.p`
    margin: 15px 0px;
    padding-bottom: 10px;
    color: rgb(79, 157, 221);
    border-bottom: 1px solid #dee2e6;
`;

const Item = styled.div`

`;

const EmployeeInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    mix-width: 900px;
    padding-bottom: 35px;

    input[type="text"] {
        width: 400px;   
    }
    ${Item} {
        margin: 15px 30px 10px 10px;
    }
`;

const ContractInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 600px;

    .form-group {
        width 250px;
    }
    input[type="text"] {
        width: 450px;   
    }

    .employee{
        input[type="text"] {
            width: 250px;   
        }
    }

    .contract{
        input[type="text"] {
            width: 250px;   
        }
    }

    ${Item} {
        margin: 15px 30px 10px 10px;
    }
`;

const Form = styled.form`
    ${EmployeeInfo} {
        margin: 0 auto;
    }
    ${ContractInfo} {
        margin: 0 auto;
    }
    button[type="submit"] {
        background: rgb(79, 157, 221);
        margin: 25px 75px;
    }

    button[type="submit"]:focus { 
        outline: none; 
    }
`;


const AddEmployee = (props) => {
    const { values, isValid, handleSubmit, setFieldValue } = props;

    const alert = useContext(AlertContext);

    const handleDateStartChange = (date) => {
        setFieldValue('employee_start', date);
    };

    const handleDateEndChange = (date) => {
        setFieldValue('employee_end', date);
    };

    const showAlert = e => {
        e.preventDefault();
        if (isValid) {
            alert.show(' Сотрудник успешно добавлен!', 'success');
            handleSubmit();
        }   
        if (!isValid) {
            alert.show(' В форме обнаружены ошибки!', 'warning');
        }
    };

    const menuItems = positionArray.map((item, i) => {
        return <MenuItem value={item} key={i}>{item}</MenuItem>
    });

    return (
        <Form onSubmit={showAlert}>
            <Text> 
                Заполните данные о сотруднике
            </Text>
            <EmployeeInfo> 
                <Item>
                    <InputField 
                        name="employee_name" 
                        label="ФИО"
                    />
                </Item>
                <Item>
                    <InputField 
                        name="employee_department" 
                        label="Факультет"
                        disabled
                    />
                </Item>
            </EmployeeInfo>
            <Text> 
                Заполните данные о контракте
            </Text>
            <ContractInfo> 
                <Item className="contract">
                    <InputField 
                        name="employee_number" 
                        label="Номер договора"
                    />
                </Item>
                <Item>
                    <SelectField 
                        name="employee_skill"
                        label="Должность"
                        labelId="simple-select-helper-label"
                        id="simple-select-helper"
                        items={menuItems}
                    />
                </Item>
                <Item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk
                            inputProps={{readOnly: true}}
                            id="1-date-picker-inline"
                            name="employee_start"
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Начало действия"
                            value={values.employee_start}
                            onChange={handleDateStartChange}
                        />
                    </MuiPickersUtilsProvider>
                </Item>
                <Item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk
                            inputProps={{readOnly: true}}
                            id="2-date-picker-inline"
                            name="employee_end"
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Окончание действия"
                            value={values.employee_end}
                            onChange={handleDateEndChange}
                        />
                    </MuiPickersUtilsProvider>
                </Item>
            </ContractInfo>
            <Text> 
            </Text>
            <Button
                type="submit" 
                variant="contained" 
                color="primary"
                onSubmit={showAlert}>
                Подтвердить
            </Button>
        </Form>
    );
    
};

const initialValues = {
    employee_name: '',
    employee_skill: '',
    employee_department: 'Факультет инновационных технологий(ФИТ)',
    employee_start: '01-01-2020',
    employee_end: '01-01-2020',
    employee_number: '',
};

const validationSchema = yup.object().shape({
    employee_name: yup
        .string()
        .min(5, "ФИО слишком короткое")
        .max(45, "ФИО слишком длинное")
        .required("Поле обязательно к заполнению"),
    employee_number: yup
        .string()
        .max(10, "Номер слишком длинный")
        .required("Поле обязательно к заполнению")
});

const AddEmployeeForm = withFormik({
    mapPropsToValues: () => (initialValues),
    validationSchema,
    handleSubmit: ({
        employee_name, employee_skill, 
        employee_department, employee_start, 
        employee_end, employee_number}) => {
        EmployeeService
            .insertEmployee(
                employee_name, 
                employee_skill, 
                employee_department, 
                dateFormat(employee_start, 'yyyy-mm-dd'), 
                dateFormat(employee_end, 'yyyy-mm-dd'), 
                employee_number)
            .catch((error) => console.error(error))
    }
})(AddEmployee);

export default memo(AddEmployeeForm);


