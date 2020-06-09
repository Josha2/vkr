import React, { useContext, useEffect, useState } from 'react';
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
    width: 950px; 
    flex-grow: 1;
    justify-content: center;

        .form-group {
            width 450px;
            margin: 0 15px;
        }
`;

const ContainerHours = styled.div`
    display: flex;
`;

const Text = styled.p`
    margin: 25px 80px 25px 80px;
`;

const Form = styled.form`
    ${EmployeeDetails} {
        margin: 0 auto;
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

    const submitHandler = e => {
        e.preventDefault();
        alert.show(' Учебная нагрузка успешно добавлена!', 'success');
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-2">
            <Text> 
                Выберите сотрудника
            </Text>
            <ContainerInfo>
                <SelectField
                    name="employeeId"    
                    label="Сотрудник"
                    labelId="employee simple-select-helper-label"
                    id="employee simple-select-helper"
                    items={employeesList}
                    />
                <SelectField
                    name="disciplineId"    
                    label="Дисциплина"
                    labelId="discipline simple-select-helper-label"
                    id="discipline simple-select-helper"
                    items={disciplinesList}
                />
            </ContainerInfo>
            <ContainerHours>
                <InputField
                    name="lectures"
                    label="Лекции"
                />
                <InputField
                    name="seminar"
                    label="Семинарские (практические) занятия"
                />
                <InputField
                    name="diploma"
                    label="Дипломные (курсовые) работы"
                />
                <InputField
                    name="sets"
                    label="Зачеты"
                />
                <InputField
                    name="exams"
                    label="Экзамены"
                />
                <InputField
                    name="consultations"
                    label="Консультации"
                />
                <InputField
                    name="other"
                    label="Другая учебная работа"
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
};

const initialValues = {
    employeeId: '',
    disciplineId: '',
    lectures: '',
    seminar: '',
    diploma: '',
    sets: '',
    exams: '',
    consultations: '',
    other: '',
};

const AddWorkLoadForm = withFormik({
    mapPropsToValues: () => (initialValues),
    handleSubmit: (initialValues) => {
        console.log(initialValues);
    }
})(AddWorkLoad);

export default AddWorkLoadForm;