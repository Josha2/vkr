import React, { useContext, useEffect, useState, memo } from 'react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import { MenuItem, Button } from '@material-ui/core';
import InputField from '../../common/components/controls/InputField';
import SelectField from '../../common/components/controls/SelectField';
import EmployeeService from '../../service/ApiService';

const ContainerInfo = styled.div`
    display: flex;
    justify-content: center;
    .form-group {
        width: 350px;
        margin-bottom: 25px;
    }
`;

const ContainerHours = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    input[type="text"] {
        width: 185px;
    }

    div {
        margin: 5px;
    }
`;

const Form = styled.form`
   ${ContainerInfo} {
        margin: 0 auto;
   }

   button[type="submit"] {
    background: rgb(79, 157, 221);
    margin: 15px 11px;
}

button[type="submit"]:focus { 
    outline: none; 
}
`;

const PersonHours = (props) => {
    const { isValid, handleSubmit, disciplines } = props;
    const disciplinesList = disciplines.map((item) => {
        return (
            <MenuItem 
                key={item.discipline_id}
                value={item.discipline_id}>
                {item.discipline_name}
            </MenuItem>
        );
    });

    return (
        <Form onSubmit={handleSubmit}>
            <ContainerInfo>
                <SelectField
                    name="discipline_id"    
                    label="Выберите дисциплину"
                    labelId="discipline-simple-select-helper-label"
                    id="discipline-simple-select-helper"
                    items={disciplinesList}
                />
            </ContainerInfo>
            <ContainerHours>
                <InputField
                    name="lectures"
                    label="Лекции"
                    variant="outlined"
                />
                <InputField
                    name="seminar"
                    label="Семинарские занятия"
                    variant="outlined"
                />
                <InputField
                    name="diploma"
                    label="Дипломные работы"
                    variant="outlined"
                />
                <InputField
                    name="sets"
                    label="Зачеты"
                    variant="outlined"
                />
                <InputField
                    name="exams"
                    label="Экзамены"
                    variant="outlined"
                />
                <InputField
                    name="consultations"
                    label="Консультации"
                    variant="outlined"
                />
                <InputField
                    name="other"
                    label="Другая учебная работа"
                    variant="outlined"
                />
            </ContainerHours>
            <div className="d-flex justify-content-end">
                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onSubmit={handleSubmit}>
                    Подтвердить
                </Button>
            </div>
        </Form>
    );
}

const initialValues = {
    employee_id: '',
    discipline_id: '',
    lectures: 4,
    seminar: 7,
    diploma: null,
    sets: 12,
    exams: null,
    consultations: null,
    other: 11,
};

const noMoreThanThreeDigit = "Максимум трёхзначное значение";
const mustBeNumber = "Допустимы только цифры";

const validationSchema = yup.object().shape({
    lectures: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    seminar: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    diploma: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    sets: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    exams: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    consultations: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    other: yup
        .number()
        .nullable()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
})


const PersonHoursForm = withFormik({
    mapPropsToValues: () => (initialValues),
    validationSchema,
    handleSubmit: (personInfo) => {
        console.log(personInfo)
    }
})(PersonHours);

export default memo(PersonHoursForm);