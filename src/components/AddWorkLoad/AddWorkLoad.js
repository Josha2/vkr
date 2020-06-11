import React, { useContext, useEffect, useState, memo } from 'react';
import { AlertContext } from '../../common/components/context/alert/alertContext';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { MenuItem, Button } from '@material-ui/core';
import * as yup from 'yup';
import InputField from '../../common/components/controls/InputField';
import SelectField from '../../common/components/controls/SelectField';
import EmployeeService from '../../service/ApiService';

const ContainerInfo = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    padding: 35px 0;
        .form-group {
            width 450px;
            margin: 0 15px;
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
        margin: 10px 5px 10px 0px;
    }
`;

const Text = styled.p`
    margin: 15px 0px;
    padding-bottom: 10px;
    color: rgb(79, 157, 221);
    border-bottom: 1px solid #dee2e6;
`;

const Form = styled.form`
    ${ContainerInfo} {
        margin: 0 auto;
    }
    ${ContainerHours} {
        padding: 0 75px 15px 75px;
        border-bottom: 1px solid #dee2e6;
    }

    button[type="submit"] {
        background: rgb(79, 157, 221);
        margin: 25px 75px;
    }

    button[type="submit"]:focus { 
        outline: none; 
    }
`;


const AddWorkLoad = (props) => {
    const { isValid, handleSubmit } = props;

    const alert = useContext(AlertContext);
    const [employees, setEmployees] = useState([]);
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const employees = await EmployeeService.getEmployees();
            const disciplines = await EmployeeService.getDisciplines();
            setEmployees(employees);
            setDisciplines(disciplines);
        };

        fetch();
        // eslint-disable-next-line
    }, []);

    const disciplinesList = disciplines.map((item) => {
        return (
            <MenuItem 
                key={item.discipline_id}
                value={item.discipline_id}>
                {item.discipline_name}
            </MenuItem>
        );
    });

    const employeesList = employees.map((item) => {
        return (
            <MenuItem 
                key={item.employee_id}
                value={item.employee_id}>
                {item.employee_name}
            </MenuItem>
        );
    });

    const showAlert = e => {
        e.preventDefault();
        alert.show(' Учебная нагрузка успешно добавлена!', 'success');
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-2">
            <Text> 
                Выберите сотрудника
            </Text>
            <ContainerInfo className="mb-2">
                <SelectField
                    name="employee_id"    
                    label="Сотрудник"
                    labelId="employee-simple-select-helper-label"
                    id="employee simple-select-helper"
                    items={employeesList}
                    />
                <SelectField
                    name="discipline_id"    
                    label="Дисциплина"
                    labelId="discipline-simple-select-helper-label"
                    id="discipline-simple-select-helper"
                    items={disciplinesList}
                />
            </ContainerInfo>
            <Text> 
                Введите часы:
            </Text>
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
            <Button
                type="submit" 
                variant="contained" 
                color="primary"
                onSubmit={handleSubmit}>
                Подтвердить
            </Button>
        </Form>
    );
};

const initialValues = {
    employee_id: '',
    discipline_id: '',
    lectures: '',
    seminar: '',
    diploma: '',
    sets: '',
    exams: '',
    consultations: '',
    other: '',
};

const noMoreThanThreeDigit = "Максимум трёхзначное значение";
const mustBeNumber = "Допустимы только цифры";
const mustBeFilled = "Поле обязательно к заполнению";

const validationSchema = yup.object().shape({
    employee_id: yup
        .string()
        .required(mustBeFilled),
    discipline_id: yup
        .string()
        .required(mustBeFilled),
    lectures: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    seminar: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    diploma: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    sets: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    exams: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    consultations: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
    other: yup
        .number()
        .typeError(mustBeNumber)
        .max(999, noMoreThanThreeDigit),
})

const AddWorkLoadForm = withFormik({
    mapPropsToValues: () => (initialValues),
    validationSchema,
    handleSubmit: ({
        employee_id, discipline_id, lectures,
        seminar, diploma, sets,
        exams, consultations, other
    }) => {
        EmployeeService
            .insertDisciplineHours(
                employee_id, discipline_id, lectures,
                seminar, diploma, sets,
                exams, consultations, other);
    }
})(AddWorkLoad);

export default memo(AddWorkLoadForm);

